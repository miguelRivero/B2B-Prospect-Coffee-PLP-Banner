new casperEventHub.Experience("Prospects Homepage Banner")
  .visitorIs({
    status: "anonymous",
  })
  .executeOnMatch(function (data) {
    //Check if there's a PromotionBanner and if so, hide it.
    let documentObserver = new MutationObserver(function (mutations) {
      //console.log("banner not found yet");
      if (document.contains(document.querySelector(".PromotionBanner"))) {
        document.querySelectorAll(".PromotionBanner").forEach((el) => {
          if (!el.classList.contains("ProspectsBanner")) {
            el.classList.add("VisuallyHidden");
          }
        });
        //console.log("banner found");
        documentObserver.disconnect();
      }
    });

    documentObserver.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });

    //Getting country and lang data
    const getMarket = () => {
      return config.defaults.addressCountry;
    };

    const getLang = () => {
      if (!window.config) {
        console.log("AB - window.config not found");
      }
      const ns = window.config.padl.namespace;
      if (!ns) {
        console.log("AB - padl.namespace not found");
      }
      const dataLayer = window[ns].dataLayer;
      if (!dataLayer) {
        console.log("AB - window[ns].dataLayer not found");
      }
      return window[ns].dataLayer.page.page.pageInfo.language;
    };
    const _market = getMarket();
    const _lang = getLang();

    //Apending HTML

    const bannerContent = window.ProspectsHomeBannerCopy[_market];
    let mainEl = document.getElementById("main");
    // let style = document.createElement("style"); //Appending StyleSheet
    // style.innerHTML = `
    //     @font-face{font-family:NespressoLucas-Bold;src:url(https://www.nespresso.com/shared_res/agility/commons/fonts/NespressoLucas-Bold.woff) format("woff");font-style:normal;font-weight:700}@font-face{font-family:NespressoLucas-XtraBd;src:url(https://www.nespresso.com/shared_res/agility/commons/fonts/NespressoLucas-XtraBd.woff) format("woff");font-style:normal;font-weight:800}.stickybanner_container{position:fixed;z-index:997;width:100%;-webkit-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;transition:bottom .2s ease-in-out}.stickybanner_arrow{width:50px;height:50px;margin:auto;border-radius:25px;text-align:center;font-size:26px;padding-top:12px;-webkit-text-stroke:2px;cursor:pointer;margin-top:-23px;background-color:#8f7247;-webkit-text-stroke-color:#8f7247}.stickybanner_arrow_icon{display:block;-webkit-transition:-webkit-transform .2s ease-in-out;transition:-webkit-transform .2s ease-in-out;-o-transition:transform .2s ease-in-out;transition:transform .2s ease-in-out;transition:transform .2s ease-in-out, -webkit-transform .2s ease-in-out}.stickybanner_ribbon_content_left,.stickybanner_ribbon_content_right{width:25%}.stickybanner_ribbon_content_text{width:50%;margin:auto}.stickybanner_arrow_icon_opened{transform:translate(-180deg);-ms-transform:rotate(-180deg);-webkit-transform:rotate(-180deg)}.stickybanner_ribbon{cursor:pointer;padding:0 12px}.stickybanner_ribbon_optout{position:absolute;right:0;padding:6px;cursor:pointer}.stickybanner_content{background-color:#fff;color:#000;padding:12px;width:100%;display:none}.stickybanner_container{background-color:#fff}.stickybanner_ribbon_content{text-align:center;width:100%;max-width:996px;margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:80%}.stickybanner_title{font-weight:700;font-size:18px;text-transform:uppercase;color:#000;letter-spacing:3px;line-height:31px;padding-top:23px}.stickybanner_ribbon_tagline,.stickybanner_ribbon_tagline_see_all{padding-top:3px;padding-bottom:6px;color:#8f7247;font-family:"Nespresso Lucas";font-size:16px;font-weight:700;line-height:31px;letter-spacing:1px}.stickybanner_ribbon_description{color:#000;font-size:16px;font-weight:300;letter-spacing:1px;line-height:24px;text-align:center;width:100%}.stickybanner_content_wrapper{width:49%;max-width:615px;margin-top:15px;border-spacing:0;padding:8px 0;vertical-align:middle;text-align:center}.stickybanner_content_rules{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;margin:auto;max-width:996px;padding-bottom:15px}.stickybanner_content_wrapper img{width:45%}div.stickybanner_content>div:nth-child(3){padding-left:32px;border-left:solid #000 1px}.stickybanner_content_title{font-weight:700;font-size:15px}.stickybanner_content_button{font-size:14px;border-radius:3px;background-color:#3d8705;-webkit-box-shadow:0 1px 1px 0 rgba(0,0,0,.3);box-shadow:0 1px 1px 0 rgba(0,0,0,.3);display:inline-block;padding:.8em 2em;line-height:1.2em;cursor:pointer;min-width:200px;margin-top:16px;color:#fff;font-weight:700;letter-spacing:1px}.stickybanner_content_button_contact{font-size:14px;border-radius:3px;background-color:#8f7247;-webkit-box-shadow:0 1px 1px 0 rgba(0,0,0,.3);box-shadow:0 1px 1px 0 rgba(0,0,0,.3);display:inline-block;padding:.8em 2em;line-height:1.2em;cursor:pointer;min-width:200px;margin-top:16px;color:#fff;font-weight:700;letter-spacing:1px}.stickybanner_content_button:hover{-webkit-box-shadow:0 3px 3px 0 rgba(0,0,0,.3);box-shadow:0 3px 3px 0 rgba(0,0,0,.3)}.stickybanner_content_button div>span{letter-spacing:1px;text-align:center;color:#fff;display:block}@media screen and (max-width:600px){.stickybanner_content_button{font-size:inherit;padding:.8em 1em;width:80%}.stickybanner_content_button_contact{width:80%}.stickybanner_content_rules{display:block}.stickybanner_content_wrapper{width:100%}.stickybanner_content_wrapper img{width:70%}.stickybanner_ribbon{padding-top:25px}.stickybanner_arrow{margin-top:0}.stickybanner_ribbon_content_left,.stickybanner_ribbon_content_right{width:10%}.stickybanner_ribbon_content_left>img{margin-left:-146px}.stickybanner_ribbon_content_text{width:60%}}@media screen and (max-width:996px){.stickybanner_container{max-height:80%;z-index:99998}.stickybanner_arrow{margin-top:0}.overflow{overflow-y:scroll}.stickybanner_content_wrapper img{width:40%}}    `;
    // document.head.appendChild(style); //Apending HTML
    let bannerContainer = document.createElement("div");
    bannerContainer.classList.add("prospects-homepage-banner");
    mainEl.prepend(bannerContainer);
    bannerContainer.innerHTML = `
        <div class="stickybanner_container" style="bottom: 0px;">
          
          <div class="stickybanner_ribbon stickybanner_ribbon_back">
              <div class="stickybanner_arrow">
                  <i class="Glyph Glyph--arrow-up stickybanner_arrow_icon"></i></div>
              <div class="stickybanner_ribbon_content">
                  <div class="stickybanner_ribbon_content_left" style="">
                  <img src="/shared_res/mos/free_html/b2b/prospects_journey/Sticky_Banner/img/capsulesLeft_L.png">
                  </div>
                  <div class="stickybanner_ribbon_content_text">
                  <div class="stickybanner_title">${bannerContent.heading[_lang]}</div>
                  <div class="stickybanner_ribbon_tagline" style="">${bannerContent.subheading[_lang]}</div>
                  </div>
                  <div class="stickybanner_ribbon_content_right" style="">
                  <img src="/shared_res/mos/free_html/b2b/prospects_journey/Sticky_Banner/img/right-image_L.png">
                  </div>
              </div>
          </div>
      
          <div class="stickybanner_content" id="expandable" style="display: none;">
              <div class="stickybanner_ribbon_description">${bannerContent.text[_lang]}</div>
                  <div class="stickybanner_content_rules">
                  <div class="stickybanner_content_wrapper">
                      <div class="stickybanner_content_title">
                          <img src="/shared_res/mos/free_html/b2b/prospects_journey/Sticky_Banner/img/online%20machines_L.png">
                          <p>${bannerContent.question1[_lang]}</p>
                          <a href="/pro/au/en/order/machines/pro"><div class="stickybanner_content_button">${bannerContent.cta1[_lang]}</div></a>
                      </div>
                  </div>
                  <div class="stickybanner_content_wrapper">
                      <div class="stickybanner_content_title">
                          <img src="/shared_res/mos/free_html/b2b/prospects_journey/Sticky_Banner/img/Aguila_L.png">
                          <p>${bannerContent.question2[_lang]}</p>
                          <a href="/pro/au/en/professional-contactus"><div class="stickybanner_content_button_contact">${bannerContent.cta2[_lang]}</div></a>
                          <a href="/pro/au/en/order/machines/pro"><div class="stickybanner_ribbon_tagline_see_all">${bannerContent.cta3[_lang]}</div></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `; //Click event for animation
    const ribbon = document.querySelector(".stickybanner_ribbon");
    ribbon.onclick = () => {
      $(ribbon).parent().toggleClass("overflow");
      $(ribbon).toggleClass("stickybanner_ribbon_back");
      $(".stickybanner_arrow_icon").toggleClass(
        "stickybanner_arrow_icon_opened"
      );
      $(".stickybanner_ribbon_content_left").fadeToggle();
      $(".stickybanner_ribbon_content_right").fadeToggle();
      $(".stickybanner_ribbon_tagline").fadeToggle();
      $(ribbon).siblings().slideToggle("slow");
    };
    data.unsubscribe();
  })
  .evaluate();
