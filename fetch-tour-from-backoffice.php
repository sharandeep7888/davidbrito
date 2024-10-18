<?php
/*
Plugin Name: Fetch Tour from Backoffice

Description: This plugin gets the information of a tour from backoffice.
Version:     1.0.0
*/
add_shortcode('get_tours','get_tours_function');
function get_tours_function($atts){

  $ship_id = $atts['ship_id'];
  $content = file_get_contents("https://backoffice.galapagosdanatours.com/front_api/get_tours_by_ship/".$ship_id);
  $content = json_decode($content);

  $tabs = "";
  $tabs .= '<div class="modal-backdrop mydrop correct_center d-none">
              <img src="https://backoffice.galapagosdanatours.com/images/loading.gif">
            </div>
<div class="spotinfo"></div><div class="slider_width">
  <div class="productpage slider-month">
  <div class="nav-left" href="javascript:void(0);"></div>
  <div class="nav-right" href="javascript:void(0);"></div>
  <div class="ul_wrapper">
  <ul class="slider-nav">
  <input type="hidden" class="admin_url" value="'.admin_url( 'admin-ajax.php' ).'">
  <input type="hidden" class="load_url" value="'.plugin_dir_url(__FILE__).'images/3.gif">';

    $cnt =1;
    foreach($content as $single_c){
      if($cnt==1) {$active="active";}
      else{$active="";}
      $month_number = date("n",strtotime($single_c->month));
      $tabs .= '<li class="pagi-item pagi-item-container '.$active.'" id="'.$single_c->id.'tab">
      <i class="fa fa-caret-left pagi-item-icon-left" style="display:none;"  ></i>
      <a class="pagi-item-link" href="javascript:void(0);" data-pager="'.$month_number.'-'.$single_c->year.'-'.$ship_id.'">'.$single_c->month.' '.$single_c->year.'</a>
      <i class="fa fa-caret-down pagi-item-icon-down" style="display:';
        if($cnt==1){
          $tabs .= " inline-block ";
        }else{
          $tabs .= " none ";
        }
      $tabs .= ';" ></i>
      <i class="fa fa-caret-right pagi-item-icon-right" style="display:';
        if($cnt==2){
          $tabs .= " inline-block ";
        }else{
          $tabs .= " none ";
        }
      $tabs .= ';"  ></i>
      </li>';
      // $tabs .= '<li role="presentation" class="'.$active.'"><a href="#tab'.$cnt.'" data-id="'.$cnt.'" role="tab" data-main="'.$month_number.'-'.$single_c->year.'-'.$ship_id.'" data-toggle="tab" class="tab_click">'.$single_c->month.' '.$single_c->year.'</a></li>';
      $cnt++;
    }
    $tabs .= '</ul>';
    $tabs .= '</div>';
    $tabs .= '<!-- Tab panes -->
    <div class="show_data">
    <div class="data_tab">';
    $content_cnt = 1;
    $scroll = "";
    foreach($content as $single_c){
      $month_number = date("n",strtotime($single_c->month));
      $data_main = $month_number.'-'.$single_c->year.'-'.$ship_id;
      if($content_cnt==1){ $active="active"; }
      else{ $active=""; }

      $scroll.='<li><a href="javascript:void(0)" data-id="'.$single_c->id.'tab">'.$single_c->month.' '.$single_c->year.'</a></li>';


      if($content_cnt==1){


        $tours = file_get_contents("https://backoffice.galapagosdanatours.com/front_api/get_tours/".$data_main);
        $tours = json_decode($tours);

        foreach($tours as $single_tour){
          $tabs .= "<div class='single_tour'>
                          <div class='first_third'>
                            <div class='tour_title show_iti' data-id='".$single_tour->id."'>".$single_tour->title."</div>
                            <div class='tour_time show_iti' data-id='".$single_tour->id."'>".date("d M Y",strtotime($single_tour->start_date))." - ".date("d M Y",strtotime($single_tour->end_date))."</div>
                            <div class='itinery_link'><a href='javascript:void(0)' data-id='".$single_tour->id."' class='iti_detail".$single_tour->id." show_iti'>Show Itinerary Map <i class='fa fa-arrow-down'></i></a></div>
                          </div>
                          <div class='second_third'>

                            <div class='price lato'>$".$single_tour->current_gross_rate."</div>";
                            if($single_tour->promotion!=""){
                            $tabs .= "<div class='org_price'>
                              <strike><strong>$".$single_tour->original_gross_rate."</strong></strike>
                            </div>
                            <div class='promotion lato_bold'>".$single_tour->promotion."</div>";
                          }
                            $tabs .= "</div>
                          <div class='last_third'>
                            <a target='_self' href='".get_bloginfo('url')."/cruise-enquire-form?iti=".$single_tour->title."&ship_name=".$single_tour->name."&length=".date("d M Y",strtotime($single_tour->start_date))."-".date("d M Y",strtotime($single_tour->end_date))."'>Enquiry</a>";
                            if($single_tour->available>0 && $single_tour->available<7){
                              $tabs .= "<div class='available'>".$single_tour->available." spots available</div>";
                            }
                            $tabs .= "</div>
                          <div style='clear:both'></div>


                        ";
                        $tabs .= '<!---->
                        <div class=" col-md-12 days_div clearfix" id="days_div'.$single_tour->id.'">';
                        if($single_tour->itinerary_image != ""){
                        $tabs .='<div class="itinerary_image">
                          <img class="img-fluid" src="https://backoffice.galapagosdanatours.com/uploads/'.$single_tour->itinerary_image.'" title="Galapagos Cruise" alt="Galapagos Cruise">
                        </div>';
                      }
                        $i=0;
                        $tabs .= "<div class='iti_div clearfix'>";
                          foreach($single_tour->days as $day){
                        $tabs .= '<ul class="main_list_iti">
                              <li><span class="iti_date">'.date("d M",strtotime($single_tour->start_date ."+".$i." days")).'<br> '.date("l",strtotime($single_tour->start_date ."+".$i." days")).'</span>
                            <ul class="sub_list_iti">';
                            foreach($day as $single_day){
                            $tabs .= '<li>';
                            if($single_day->iname != $single_day->name){
                              $tabs .= '<span><strong>'.$single_day->timez.'</strong>&nbsp;'.$single_day->iname.':&nbsp;<span class="spot_link" id="'.$single_day->spot_id.'" data-island="'.$single_day->iname.'">'.$single_day->name." <i class='fa fa-external-link'></i></span></span>";
                            }
                            else{
                              $tabs .= '<span><strong>'.$single_day->timez.'</strong>&nbsp;Islet:'.'&nbsp;<span class="spot_link" id="'.$single_day->spot_id.'" data-island="Islet">'.$single_day->name.' <i class="fa fa-external-link"></i></span></span>';
                            }
                            $tabs .= '</li>';
                            }
                              $tabs .= '</ul>
                            </li>
                          </ul>';
                          $i++;
                        }
                          $tabs .= '</div></div><div style="clear:both"></div>
                          </div>
                        <!---->';

        }

}
      $content_cnt++;

    }
    $tabs .= '</div>';
    $tabs .=  '<ul class="dropdown-menu scrollable-menu-custom" role="menu">';
                $tabs .= $scroll;
            $tabs .= '</ul>';
	return $tabs;
}

add_action( 'wp_ajax_wp_get_tour', 'wp_get_tour' );    //execute when wp logged in
add_action( 'wp_ajax_nopriv_wp_get_tour', 'wp_get_tour'); //execute when logged out


function wp_get_tour(){
  $data_main = $_REQUEST['data_main'];
  $tours = file_get_contents("https://backoffice.galapagosdanatours.com/front_api/get_tours/".$data_main);
  $tours = json_decode($tours);
  $str_main = "";
  foreach($tours as $single_tour){
    $str_main .= "<div class='single_tour'>
                    <div class='first_third'>
                      <div class='tour_title show_iti' data-id='".$single_tour->id."'>".$single_tour->title."</div>
                      <div class='tour_time show_iti' data-id='".$single_tour->id."'>".date("d M Y",strtotime($single_tour->start_date))." - ".date("d M Y",strtotime($single_tour->end_date))."</div>
                      <div class='itinery_link'><a href='javascript:void(0)' data-id='".$single_tour->id."' class='iti_detail".$single_tour->id." show_iti'>Show Itinerary Map <i class='fa fa-arrow-down'></i></a></div>
                    </div>
                    <div class='second_third'>";

                    $str_main .= "<div class='price lato'>$".$single_tour->current_gross_rate."</div>";
                    if($single_tour->promotion != "" ){
                    $str_main .= "<div class='org_price'>
                        <strike><strong>$".$single_tour->original_gross_rate."</strong></strike>
                      </div>
                      <div class='promotion lato_bold'>".$single_tour->promotion."
                        </div>";
                    }
                    $str_main .="</div>
                    <div class='last_third'>
                      <a target='_self' href='".get_bloginfo('url')."/cruise-enquire-form?iti=".$single_tour->title."&ship_name=".$single_tour->name."&length=".date("d M Y",strtotime($single_tour->start_date))."-".date("d M Y",strtotime($single_tour->end_date))."'>Enquiry</a>";
                      if($single_tour->available>0 && $single_tour->available<7){
                        $str_main .= "<div class='available'>".$single_tour->available." spots available</div>";
                      }
                    $str_main .="</div><div style='clear:both'></div>
                  ";

                  $str_main .= '<!---->
                  <div class=" col-md-12 days_div clearfix" id="days_div'.$single_tour->id.'">';
                  if($single_tour->itinerary_image != ""){
                  $str_main .='<div class="itinerary_image">
                    <img class="img-fluid" src="https://backoffice.galapagosdanatours.com/uploads/'.$single_tour->itinerary_image.'" title="Galapagos Cruise" alt="Galapagos Cruise">
                  </div>';
                }
                  $i=0;
                  $str_main .= "<div class='iti_div clearfix'>";
                    foreach($single_tour->days as $day){
                  $str_main .= '<ul class="main_list_iti">
                        <li><span class="iti_date">'.date("d M",strtotime($single_tour->start_date ."+".$i." days")).'<br> '.date("l",strtotime($single_tour->start_date ."+".$i." days")).'</span>
                      <ul class="sub_list_iti">';
                      foreach($day as $single_day){
                      $str_main .= '<li>';
                      if($single_day->iname != $single_day->name){
                              $str_main .= '<span><strong>'.$single_day->timez.'</strong>&nbsp;'.$single_day->iname.':&nbsp;<span class="spot_link" id="'.$single_day->spot_id.'" data-island="'.$single_day->iname.'">'.$single_day->name." <i class='fa fa-external-link'></i></span></span>";
                            }
                            else{
                              $str_main .= '<span><strong>'.$single_day->timez.'</strong>&nbsp;Islet:'.'&nbsp;<span class="spot_link" id="'.$single_day->spot_id.'" data-island="'.$single_day->iname.'">'.$single_day->name.' <i class="fa fa-external-link"></i></span></span>';
                            }
                      $str_main .= '</li>';
                      }
                        $str_main .= '</ul>
                      </li>
                    </ul>';
                    $i++;
                  }
                    $str_main .= '</div></div><div style="clear:both"></div>
                    </div>
                  <!---->';

  }
  $str_main .= "</div>";
  echo $str_main;
  // print_r($tours);
  die();
}
add_action( 'wp_enqueue_scripts', 'tab_scroller_scripts' );
// add_action( 'wp_footer', 'get_tours_data_by_month' );
function tab_scroller_scripts(){
 wp_enqueue_style( 'external_css', 'https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');	
  wp_enqueue_style( 'boot_css', plugin_dir_url(__FILE__).'css/bootstrap.min.css');
  wp_enqueue_style( 'custom_mine', plugin_dir_url(__FILE__).'css/mine_custom.css');
  wp_enqueue_style( 'show', plugin_dir_url(__FILE__).'css/font-awesome.min.css');
  // wp_enqueue_style( 'modal_css', plugin_dir_url(__FILE__).'css/modal.css');
  // wp_enqueue_script( 'my-jquery-file', 'https://code.jquery.com/jquery-3.5.1.min.js');
  wp_enqueue_script( 'my-bootstrap-file', plugin_dir_url(__FILE__).'js/bootstrap.min.js');
  wp_enqueue_script( 'scroll-tab', plugin_dir_url(__FILE__).'js/run.js');
}

function get_tours_data_by_month(){ ?>
  <script>
    jQuery(document).ready(function($){
      $(".tab_click").on("click",function(){
         var data_main = $(this).attr('data-main');
         var cnt_id =  $(this).attr('data-id');
         var url = "<?php echo admin_url( 'admin-ajax.php' );?>";
         // $("#tab"+cnt_id).html("<div class='loading'><img src='<?php echo plugin_dir_url(__FILE__).'images/3.gif'; ?>'></div>");

         $.ajax({
 type: "GET",
 url: url, //"https://backoffice.galapagosdanatours.com/front_api/get_tours/?callback=?",
 data: {
  data_main:data_main,
  action:'wp_get_tour',
 },
 success: function(response){
   console.log(response);
      $("#tab"+cnt_id).html(response);
    },
 error:function(error){
   alert(JSON.stringify(error));
 }
});

      });
    });
  </script>
<?php }


add_action('wp_footer','get_ship_data');
function get_ship_data(){
  $iti = $_REQUEST['iti'];
  $ship_name = $_REQUEST['ship_name'];
  $length = $_REQUEST['length'];
  ?>
    <script>
    jQuery(document).ready(function($){
      $("#form-field-field_3edf123").attr("readonly",true);
      $("#form-field-field_3edf123").val("<?php echo $ship_name; ?>");

      $("#form-field-field_b7e117e").attr("readonly",true);
      $("#form-field-field_b7e117e").val("<?php echo $iti; ?>");

      $("#form-field-field_592be92").attr("readonly",true);
      $("#form-field-field_592be92").val("<?php echo $length; ?>");
    });
    </script>
  <?php
}
  
  add_action( 'wp_ajax_get_spot_info', 'get_spot_info' );    //execute when wp logged in
  add_action( 'wp_ajax_nopriv_get_spot_info', 'get_spot_info'); //execute when logged out

  function get_spot_info(){    
    $spot_id = $_REQUEST['spot_id'];
    //echo "https://backoffice.galapagosdanatours.com/b2c/get_spot_info_api/".$spot_id;
    $data = file_get_contents("https://backoffice.galapagosdanatours.com/b2c/get_spot_info_api/".$spot_id);
    $content = json_encode($data);
    echo($content);
    // return $content;
    die();
  }

  /** 161024 */
  add_action( 'wp_ajax_get_spot_info_v1', 'get_spot_info_v1' );    //execute when wp logged in
  add_action( 'wp_ajax_nopriv_get_spot_info_v1', 'get_spot_info_v1'); //execute when logged out
  function get_spot_info_v1(){    
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Content-Type: application/json");
    $spot_id = $_REQUEST['spot_id'];
    //echo "https://backoffice.galapagosdanatours.com/b2c/get_spot_info_api/".$spot_id;
    $data = file_get_contents("https://backoffice.galapagosdanatours.com/b2c/get_spot_info_api/".$spot_id);
    echo($data);
    // return $content;
    die();
  }

  add_action( 'wp_ajax_get_tours_v1', 'get_tours_v1' );    //execute when wp logged in
  add_action( 'wp_ajax_nopriv_get_tours_v1', 'get_tours_v1'); //execute when logged out
function get_tours_v1()
{
  $spot = $_GET["id"];
  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
  header("Content-Type: application/json");
  $data = file_get_contents("https://backoffice.galapagosdanatours.com/front_api/get_tours/$spot");
  echo($data);
  die();
}
  add_action( 'wp_ajax_get_tours_by_ship_v1', 'get_tours_by_ship_v1' );    //execute when wp logged in
  add_action( 'wp_ajax_nopriv_get_tours_by_ship_v1', 'get_tours_by_ship_v1'); //execute when logged out

function get_tours_by_ship_v1()
{
  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
  header("Content-Type: application/json");
  $data = file_get_contents("https://backoffice.galapagosdanatours.com/front_api/get_tours_by_ship/12
  ");
  echo($data);
  die();
}
?>

<?php 
function backoffice_tours_script($args){
  $id = $args["id"] ?? "12";
  echo "<script>const tour = \"$id\";</script>";
  wp_register_script( 'tour-js',  plugin_dir_url( __FILE__ ) . 'js/tour.js' );
    wp_enqueue_script( 'tour-js' );
}
add_shortcode('backoffice_tours_script','backoffice_tours_script');
?>