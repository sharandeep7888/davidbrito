// console.log(tour);
fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_tours_v1&id=10-2024-${tour}`).then(res => res.json()).then(async (data) => {
    const tour_events = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_tours_by_ship_v1`).then(res => res.json())

// console.log(data);
const j = Map.groupBy(data, ({title}) => title?.split(":")[0]);
const final = (Array.from(j));
// console.log(final, 'fetch("/wp-admin/admin-ajax.php?action=get_spot_info&spot_id=12").then(r => r.json()).then(r => console.log(r))')
var v = '';
const tev = Array.from(Map.groupBy(tour_events, ({year}) => year));
const yyy = tev.reduce(function(i,c){
    v+= `<option>${c[0]}</option>`;
    return v;
},v)
const tabs = final.reduce(async function(i, n, k) {
    // console.log(n[1][0]?.itinerary_image);
    const {start_date, end_date,original_gross_rate,current_gross_rate,title, days, name} = (n[1][0])
    let t = "",oo = "", days_ss = "";
    for (kk in days) {
        let g = "";
        const spotis = (days[kk])?.reduce(function (i, c) { 
            g += g.substr(-1, 1) == "|" ? `${c?.spot_id}|` : `${c?.spot_id}|`;
            return g;
        }, g)
        t+= `<li class="${kk == 1 ? "active" : ""}" data-spot_id="${spotis.endsWith("|") ? spotis.substr(0,spotis.length - 1): spotis}">DAY ${kk}</li>`;
    }
        const hh = (days[1]);
    let v = "";
        const vv = await hh.reduce(async function(i,c, k){
            const {spot_id, timez} = c;
            const [spotinfo] = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_spot_info_v1&spot_id=${spot_id}`).then(res => res.json())
            v += `<div class="tab-data-main"><div class="tab-data2-lft"><img src="https://backoffice.galapagosdanatours.com/uploads/${spotinfo?.image}" /></div>
             <div class="tab-data2-rgt">
    <h3>Day 1/8</h3>
    <p><b>${timez}</b>  ${spotinfo?.description}</p>
</div></div>`;
            // console.log(spotinfo);
return await v;
        },v);
        days_ss+= vv;

    return await i + `<li>
    <button tab>${n[0].split("-")?.[0]} <span>${n[0].split("-")?.[1]?.charAt(2)}</span></button>
    <div tab-content>
    <div class="elementor-element elementor-element-d11a1d4 hom-code-sec e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="d11a1d4" data-element_type="container">
        <div class="e-con-inner">
    <div class="elementor-element elementor-element-8660437 elementor-widget elementor-widget-html" data-id="8660437" data-element_type="widget" data-widget_type="html.default">
    <div class="elementor-widget-container">
<div class="cod-sec">   
<div class="cod-sec1">
<!-- <div class="cod-tab">
<ul tour-days_tab="">
    <li class="active"><button>8 - Day <span>B</span></button></li>
    <li><button>5 - Day <span>A</span></button></li>
    <li><button>8 - Day <span>A</span></button></li>
</ul>
</div> -->
<div class="tab-data">
<div class="tab-data-lft">
    <h3>${n[1][0]?.title}</h3>
    <div class="data-img">
     <img decoding="async" src="https://backoffice.galapagosdanatours.com/uploads/${n[1][0]?.itinerary_image || 'https://backoffice.galapagosdanatours.com/uploads//1596832080_MY%20Infinity%204%20Days%20Itinerary%204A%20-%20Santiago%20&%20Genovesa.jpg'}" alt="data img1 -" title="data img1 -">


        

    </div>
    <div class="tab-data-logo">
        <img decoding="async" src="/wp-content/uploads/2024/10/tab-logo.jpg" alt="tab logo -" title="tab logo -">
    </div>
</div>
<div class="tab-data-rgt">
    <div class="tab-data-top">
        <div class="data-rgt-link">
            <a href="#">Inclusions</a>
            <a href="#">Exclutions</a>
        </div>
    </div>
    <div class="tab-data-main">
        <div class="table-data">
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <!-- <th>Season</th> -->
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${new Date(start_date).toLocaleDateString("en-US",{
                            dateStyle: "medium",
                        }).split(",")[0]} - ${new Date(end_date).toLocaleDateString("en-US",{
                            dateStyle: "medium",
                        }).split(",")[0]}</td>
                        <!-- <td>Regular</td> -->
                        <td class="price-data"><span class="cut-price">$${original_gross_rate}</span> <span>$${current_gross_rate}</span></td>
                        <td class="eqr-btn">
                            <div class="custom-btn hdr-button">
                                <a href="https://staging6.galapagosdanatours.com/cruise-enquire-form/?iti=${title}&ship_name=${name}&length=${new Date(start_date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric"
})}-${new Date(end_date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric"
})}" target="blank">
                                    <div class="btn-txt"> 
                                        <div class="btn-bg"></div>
                                        <span>Enquire</span>
                                    </div>
                                    <div class="btn-icon">
                                        <svg class="oArrow fillColor has_transition_1000 transition_all" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14.37 14.37" style="enable-background:new 0 0 14.37 14.37;" xml:space="preserve"> <defs> <path id="buttonArrow" d="M14.29,0.62c-0.1-0.24-0.3-0.44-0.54-0.54C13.63,0.03,13.5,0,13.37,0H2.95c-0.55,0-1,0.45-1,1s0.45,1,1,1h8.01L0.29,12.66
                                        c-0.39,0.39-0.39,1.02,0,1.41c0.2,0.2,0.45,0.29,0.71,0.29s0.51-0.1,0.71-0.29L12.37,3.41v8.01c0,0.55,0.45,1,1,1s1-0.45,1-1V1
                                        C14.37,0.87,14.34,0.74,14.29,0.62z"></path> </defs> <use x="0" y="0" xlink:href="#buttonArrow"></use> </svg>
                                    </div>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tab-data-note">
            *prices per person based in double occupancy
        </div>
    </div>
</div>
</div>
</div>

<div class="cod-sec2">
<div class="cod-tab2">
<ul class="dayb_${k}">
    ${t}
</ul>
<div class="np-arrow">
    <button class="prev"><i aria-hidden="true" class="fas fa-chevron-left"></i></button>
    <button class="next"><i aria-hidden="true" class="fas fa-chevron-right"></i></button>
</div>
</div>
<div class="tab-data2">
    ${days_ss}
</div>
</div>
</div>      </div>
    </div>
        </div>
    </div>
    </div>
    </li>`;
},"")
tabs.then(res => {
    document.getElementById('tabs_cls').innerHTML = (`<style>#tabs_cls td.price-data span, .eqr-btn {border: none !important;}</style>
    <div class="ym-dd">
            <ul>
                <li>
                    <label>Month:</label>
                    <select mmm>
                        
                    </select>
                </li>
                <li>
                    <label>Year:</label>
                    <select yyy>
                        ${yyy}
                    </select>
                </li>
            </ul>
        </div>
    <ul class="cod-tab" tabs>${res}</ul>`);
    jQuery(document).ready(function ($) {
    setTimeout(() => {
        for (let i = 0; i < 5; i++) { 
            $(`ul.dayb_${i} li`).click(async function () { 
                $(this).parent().children("li.active").removeClass("active");
                $(this).addClass("active");
                // console.log(bb);
                let ids = $(this).data("spot_id"), v = "";
                ids = ids.split("|");
                const des = await ids.reduce(async function (i,c){
                    const [spotinfo] = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_spot_info_v1&spot_id=${c}`).then(res => res.json())
v += `<div class="tab-data-main"><div class="tab-data2-lft"><img src="https://backoffice.galapagosdanatours.com/uploads/${spotinfo?.image}" /></div>
             <div class="tab-data2-rgt">
    <h3>Day 1/8</h3>
    <p><b></b>  ${spotinfo?.description}</p>
</div></div>`;
                    return await v;
                                }, ids);
                $(this).parent().parent().next(".tab-data2").html(des);
            });
        }
        $(`.np-arrow .next`).click(function () { 
            ($(this).parent().parent().find(`ul li.active`)).next().click()
        });
        $(`.np-arrow .prev`).click(function () { 
            ($(this).parent().parent().find(`ul li.active`)).prev().click()
        });
        $("ul[tabs] li").click("[tab]",function (e) { 
            e.preventDefault();
            $("[tab-content]").hide();
            ($(this).find("[tab-content]")).show();
        });
        const m_obj = { 
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12
        }
        function default_m(){
            var k = (tev.find((y) => y[0] == ("2024")))
            var mm = k.length > 0 ? k : null
            let x = "";
            const n = (mm[1]).reduce(function(i,c,k){
                x+= `<option value="${m_obj?.[c?.month]}">${c?.month}</option>`;
                return x;
            }, x);
            // console.log(n);
            $("select[mmm]").html(n);
        }
        default_m();
        async function refresh() { 
            const root = ($(this)).parent().parent();
            const mm = root.find("select[mmm]").val();
            const yyy = root.find("select[yyy]").val();
            const data = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_tours_v1&id=${mm}-${yyy}-${tour}`).then(res => res.json())
            async function build_html(data) {
                return await data.reduce(async function (i, n, k) {
                    // console.log(n[1][0]?.itinerary_image);
                    const { start_date, end_date, original_gross_rate, current_gross_rate, days } = (n[1][0])
                    let t = "", oo = "", days_ss = "";
                    console.log(days);
                    for (kk in days) {
                        let g = "";
                        const spotis = (days[kk])?.reduce(function (i, c) {
                            g += g.substr(-1, 1) == "|" ? `${c?.spot_id}|` : `${c?.spot_id}|`;
                            return g;
                        }, g)
                        t += `<li class="${kk == 1 ? "active" : ""}" data-spot_id="${spotis.endsWith("|") ? spotis.substr(0, spotis.length - 1) : spotis}">DAY ${kk}</li>`;
                    }
                    const hh = (days[1]);
                    let v = "";
                    const vv = await hh.reduce(async function (i, c, k) {
                        const { spot_id, timez } = c;
                        const [spotinfo] = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_spot_info_v1&spot_id=${spot_id}`).then(res => res.json())
                        v += `<div class="tab-data-main"><div class="tab-data2-lft"><img src="https://backoffice.galapagosdanatours.com/uploads/${spotinfo?.image}" /></div>
             <div class="tab-data2-rgt">
    <h3>Day 1/8</h3>
    <p><b>${timez}</b>  ${spotinfo?.description}</p>
</div></div>`;
                        // console.log(spotinfo);
                        return v;
                    }, v);
                    days_ss += vv;

                   return await  i +  `<li>
    <button tab>${n[0].split("-")?.[0]} <span>${n[0].split("-")?.[1]?.charAt(2)}</span></button>
    <div tab-content>
    <div class="elementor-element elementor-element-d11a1d4 hom-code-sec e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="d11a1d4" data-element_type="container">
        <div class="e-con-inner">
    <div class="elementor-element elementor-element-8660437 elementor-widget elementor-widget-html" data-id="8660437" data-element_type="widget" data-widget_type="html.default">
    <div class="elementor-widget-container">
<div class="cod-sec">   
<div class="cod-sec1">
<!-- <div class="cod-tab">
<ul tour-days_tab="">
    <li class="active"><button>8 - Day <span>B</span></button></li>
    <li><button>5 - Day <span>A</span></button></li>
    <li><button>8 - Day <span>A</span></button></li>
</ul>
</div> -->
<div class="tab-data">
<div class="tab-data-lft">
    <h3>${n[1][0]?.title}</h3>
    <div class="data-img">
     <img decoding="async" src="https://backoffice.galapagosdanatours.com/uploads/${n[1][0]?.itinerary_image || 'https://backoffice.galapagosdanatours.com/uploads//1596832080_MY%20Infinity%204%20Days%20Itinerary%204A%20-%20Santiago%20&%20Genovesa.jpg'}" alt="data img1 -" title="data img1 -">


        

    </div>
    <div class="tab-data-logo">
        <img decoding="async" src="/wp-content/uploads/2024/10/tab-logo.jpg" alt="tab logo -" title="tab logo -">
    </div>
</div>
<div class="tab-data-rgt">
    <div class="tab-data-top">
        <div class="data-rgt-link">
            <a href="#">Inclusions</a>
            <a href="#">Exclutions</a>
        </div>
    </div>
    <div class="tab-data-main">
        <div class="table-data">
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <!-- <th>Season</th> -->
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${new Date(start_date).toLocaleDateString("en-US", {
                        dateStyle: "medium",
                    }).split(",")[0]} - ${new Date(end_date).toLocaleDateString("en-US", {
                        dateStyle: "medium",
                    }).split(",")[0]}</td>
                        <!-- <td>Regular</td> -->
                        <td class="price-data"><span class="cut-price">$${original_gross_rate}</span> <span>$${current_gross_rate}</span></td>
                        <td class="eqr-btn">
                            <div class="custom-btn hdr-button">
                                <a href="/availability/cruises?last_minute=yes" target="">
                                    <div class="btn-txt"> 
                                        <div class="btn-bg"></div>
                                        <span>Enquire</span>
                                    </div>
                                    <div class="btn-icon">
                                        <svg class="oArrow fillColor has_transition_1000 transition_all" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14.37 14.37" style="enable-background:new 0 0 14.37 14.37;" xml:space="preserve"> <defs> <path id="buttonArrow" d="M14.29,0.62c-0.1-0.24-0.3-0.44-0.54-0.54C13.63,0.03,13.5,0,13.37,0H2.95c-0.55,0-1,0.45-1,1s0.45,1,1,1h8.01L0.29,12.66
                                        c-0.39,0.39-0.39,1.02,0,1.41c0.2,0.2,0.45,0.29,0.71,0.29s0.51-0.1,0.71-0.29L12.37,3.41v8.01c0,0.55,0.45,1,1,1s1-0.45,1-1V1
                                        C14.37,0.87,14.34,0.74,14.29,0.62z"></path> </defs> <use x="0" y="0" xlink:href="#buttonArrow"></use> </svg>
                                    </div>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tab-data-note">
            *prices per person based in double occupancy
        </div>
    </div>
</div>
</div>
</div>

<div class="cod-sec2">
<div class="cod-tab2">
<ul class="dayb_${k}">
    ${t}
</ul>
<div class="np-arrow">
    <button class="prev"><i aria-hidden="true" class="fas fa-chevron-left"></i></button>
    <button class="next"><i aria-hidden="true" class="fas fa-chevron-right"></i></button>
</div>
</div>
<div class="tab-data2">
    ${days_ss}
</div>
</div>
</div>      </div>
    </div>
        </div>
    </div>
    </div>
    </li>`;
                }, "");
            }
            const j = Map.groupBy(data, ({title}) => title?.split(":")[0]);
            const final = (Array.from(j));

            const html = await build_html(final);
            // console.log(final);
            $("#tabs_cls ul[tabs]").html(html);
            invalidate_js()
        }
        function invalidate_js() { 
            for (let i = 0; i < 5; i++) { 
            $(`ul.dayb_${i} li`).click(async function () { 
                $(this).parent().children("li.active").removeClass("active");
                $(this).addClass("active");
                // console.log(bb);
                let ids = $(this).data("spot_id"), v = "";
                ids = ids.split("|");
                const des = await ids.reduce(async function (i,c){
                    const [spotinfo] = await fetch(`https://staging6.galapagosdanatours.com/wp-admin/admin-ajax.php?action=get_spot_info_v1&spot_id=${c}`).then(res => res.json())
v += `<div class="tab-data-main"><div class="tab-data2-lft"><img src="https://backoffice.galapagosdanatours.com/uploads/${spotinfo?.image}" /></div>
             <div class="tab-data2-rgt">
    <h3>Day 1/8</h3>
    <p><b></b>  ${spotinfo?.description}</p>
</div></div>`;
                    return v;
                                }, ids);
                $(this).parent().parent().next(".tab-data2").html(des);
            });
        }
        $(`.np-arrow .next`).click(function () { 
            ($(this).parent().parent().find(`ul li.active`)).next().click()
        });
        $(`.np-arrow .prev`).click(function () { 
            ($(this).parent().parent().find(`ul li.active`)).prev().click()
        });
        $("ul[tabs] li").click("[tab]",function (e) { 
            e.preventDefault();
            $("[tab-content]").hide();
            ($(this).find("[tab-content]")).show();
        });
        }
        $("select[mmm]").change(refresh)
        $("select[yyy]").change(refresh);
        $("select[yyy]").change(function(){
            var k = (tev.find((y) => y[0] == (this?.value)))
            var mm = k.length > 0 ? k : null
            let x = "";
            const n = (mm[1]).reduce(function(i,c, k){
                x+= `<option value="${m_obj?.[c?.month]}">${c?.month}</option>`;
                return x;
            }, x);
            $("select[mmm]").html(n);
        });
    }, 0)
});
});
});


