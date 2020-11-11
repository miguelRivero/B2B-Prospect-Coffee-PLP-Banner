import "core-js/es/object/create";
import "core-js/es/array/fill";
import "core-js/es/map";

new casperEventHub.Experience("Prospects Homepage Banner")
  .visitorIs({
    // status: "anonymous",
    status: "not-logged-in",
  })
  .executeOnMismatch(function (data) {
    console.log("mis");
    console.log(data);
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

    const getWindowWidth = () => {
      if (typeof window.innerWidth == "number") {
        return window.innerWidth;
      } else {
        if (
          document.documentElement &&
          (document.documentElement.clientWidth ||
            document.documentElement.clientHeight)
        ) {
          return document.documentElement.clientWidth;
        } else {
          if (
            document.body &&
            (document.body.clientWidth || document.body.clientHeight)
          ) {
            return document.body.clientWidth;
          }
        }
      }
    };

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
    let width = getWindowWidth();
    console.log(width);

    //Apending HTML
    const bannerContent = window.ProspectsHomeBannerCopy[_market];
    const mainEl = document.getElementById("main");
    const bannerContainer = document.createElement("div");
    const assetsUrl =
      "/shared_res/mos/free_html/b2b/prospects_journey/Sticky_Banner/img/";
    bannerContainer.classList.add("prospects-homepage-banner");
    mainEl.prepend(bannerContainer);
    bannerContainer.innerHTML = `
      <div class="stickybanner__container" style="bottom: 0px">
        <div class="stickybanner__ribbon">
          <div class="stickybanner__plus overflow">
            <i class="gg-math-plus"></i>
          </div>
          <div class="stickybanner__ribbon_content">
            <div class="stickybanner__ribbon_content_left" style="">
              <!-- <img src="${assetsUrl}left-image_L.png" /> -->
              <picture class="stickybanner__ribbon_capsules">
                <source
                  srcset="${assetsUrl}left-image_XL.png 2x, ${assetsUrl}left-image_L.png"
                  media="(min-width: 769px)"/>
                <img
                  srcset="${assetsUrl}left-image_L.png 2x"
                  src="${assetsUrl}left-image_S.png"
                  alt="Nespresso Coffee Capsules"/>
              </picture>
            </div>
            <div class="stickybanner__ribbon_content_text">
              <div class="stickybanner__title">${bannerContent.heading[_lang]}</div>
              <div class="stickybanner__ribbon_tagline" style="">
                ${bannerContent.subheading[_lang]}
                <i class="gg-chevron-right"></i>
              </div>
            </div>
            <div class="stickybanner__ribbon_content_right" style="">
              <!-- <img src="${assetsUrl}right-image_L.png" /> -->
              <picture class="stickybanner__ribbon_capsules">
                <source
                  srcset="${assetsUrl}right-image_XL.png 2x, ${assetsUrl}right-image_L.png"
                  media="(min-width: 769px)"/>
                <img
                  srcset="${assetsUrl}right-image_L.png 2x"
                  src="${assetsUrl}right-image_S.png"
                  alt="Nespresso Coffee Capsules"/>
              </picture>
            </div>
          </div>
        </div>
        <div class="stickybanner__content" id="expandable" style="display: none">
          <div class="stickybanner__ribbon_description">
            ${bannerContent.text[_lang]}
          </div>
          <div class="stickybanner__content_rules">
            <div class="stickybanner__content_wrapper">
              <!-- <img src="${assetsUrl}zenius_machine_L.png" /> -->
              <picture class="stickybanner__ribbon_capsules">
                <source
                  srcset="${assetsUrl}zenius_machine_XL.png 2x, ${assetsUrl}zenius_machine_L.png"
                  media="(min-width: 769px)"/>
                <img
                  srcset="${assetsUrl}zenius_machine_L.png 2x"
                  src="${assetsUrl}zenius_machine_S.png"
                  alt="Nespresso Coffee Capsules"/>
              </picture>
              <div class="stickybanner__content_title">
                <p class="stickybanner__content_question">
                  ${bannerContent.question1[_lang]}
                </p>
                <p class="stickybanner__content_answer">
                  ${bannerContent.answer1[_lang]}
                </p>
                <a href="/pro/au/en/order/machines/pro">
                  <div class="stickybanner__content_button">
                    ${bannerContent.cta1[_lang]}
                  </div>
                </a>
              </div>
            </div>
            <div class="stickybanner__content_wrapper">
              <!-- <img src="${assetsUrl}aguila_L.png" /> -->
              <picture class="stickybanner__ribbon_capsules">
                <source
                  srcset="${assetsUrl}aguila_XL.png 2x, ${assetsUrl}aguila_L.png"
                  media="(min-width: 769px)"/>
                <img
                  srcset="${assetsUrl}aguila_L.png 2x"
                  src="${assetsUrl}aguila_S.png"
                  alt="Nespresso Coffee Capsules"/>
              </picture>
              <div class="stickybanner__content_title">
                <p class="stickybanner__content_question">
                  ${bannerContent.question2[_lang]}
                </p>
                <p class="stickybanner__content_answer">
                  ${bannerContent.answer2[_lang]}
                </p>
                <a href="/pro/au/en/professional-contactus">
                  <div class="stickybanner__content_button_contact">
                    ${bannerContent.cta2[_lang]}
                  </div>
                </a>
                <a href="/pro/au/en/order/machines/pro">
                  <div class="stickybanner__ribbon_tagline_see_all">
                    ${bannerContent.cta3[_lang]}
                    <i class="gg-chevron-right"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>  
      `; //Click event for animation
    const ribbon = document.querySelector(".stickybanner__ribbon");
    ribbon.onclick = () => {
      var result = $(ribbon).parent().toggleClass("opened");
      if (result.hasClass("opened")) {
        $(".stickybanner__ribbon_content_left").fadeOut();
        $(".stickybanner__ribbon_content_right").fadeOut();
        $(".stickybanner__ribbon_tagline").fadeOut("fast");
        setTimeout(function () {
          $(".stickybanner__plus").removeClass("overflow");
          $(ribbon).parent().addClass("scrollable");
        }, 50);
      } else {
        $(".stickybanner__ribbon_content_left").delay(400).fadeIn();
        $(".stickybanner__ribbon_content_right").delay(400).fadeIn();
        $(".stickybanner__ribbon_tagline").delay(200).fadeIn();
        setTimeout(function () {
          $(".stickybanner__plus").addClass("overflow");
          $(ribbon).parent().removeClass("scrollable");
        }, 50);
      }
      $(ribbon).siblings().slideToggle("slow");
    };
    data.unsubscribe();
  })
  .evaluate();
