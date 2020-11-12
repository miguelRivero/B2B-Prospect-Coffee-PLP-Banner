import "core-js/es/object/create";
import "core-js/es/array/fill";
import "core-js/es/map";

new casperEventHub.Experience("Prospects Banner Pro Member")
  .visitorIs({
    status: "anonymous",
    // status: "not-logged-in",
  })
  .executeOnMatch(function (data) {
    //Check if there's a PromotionBanner and if so, hide it.
    let documentObserver = new MutationObserver(function (mutations) {
      if (document.body.contains(document.querySelector(".PromotionBanner"))) {
        document.querySelectorAll(".PromotionBanner").forEach((el) => {
          if (!el.classList.contains("ProspectsBanner")) {
            el.classList.add("VisuallyHidden");
          }
        });
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
    // const _image =
    //   "/shared_res/mos/free_html/b2b/pdp_banner_coffee/img/Momento_120_3quarts_Left_Latte_OTG_L.png";
    const _image =
      "https://www.nespresso.com/ecom/medias/sys_master/public/12410833567774/responsive-pdp-main-2000-2000-momento-100.png?impolicy=product&amp;imwidth=125";
    const _link = "/pro/au/en/order/machines/pro";

    //Apending HTML
    const mainEl = document.getElementById("main");
    const bannerContainer = document.createElement("div");
    const bannerContent = window.CoffeePLPBannerCopy[_market];

    bannerContainer.classList.add("PromotionBanner", "ProspectsBanner");
    mainEl.prepend(bannerContainer);
    bannerContainer.innerHTML = `
      <h2 class="VisuallyHidden">Promotional Banners</h2>
      <div class="TopBanner_CoffeePLP">
        <div class="TopBanner_CoffeePLP__image">
            <img src="${_image}"></img>
        </div>
        <div class="TopBanner_CoffeePLP__content">
            <div class="TopBanner_CoffeePLP__text">
                <h2>${bannerContent.heading[_lang]}</h2>
                <p>${bannerContent.subtext[_lang]}</p>
            </div>
            <div class="TopBanner_CoffeePLP__cta">
                <a id="banner-prospects-button" class="TopBanner_CoffeePLP__cta-link" href="${_link}">
                  <i aria-hidden="true"></i>
                  ${bannerContent.cta[_lang]}
                </a>
            </div>
        </div>
      </div>
      `;

    //Click event
    document
      .getElementById("banner-prospects-button")
      .addEventListener("click", function () {
        gtmDataObject.push({
          event: "promoClick",
          currencyCode: "{EUR}", // app.currency
          ecommerce: {
            promoClick: {
              promotions: [
                {
                  name: "B2B_ProspectJourney",
                  id: "B2B_ProspectJourney",
                  creative: "B2B_Prospect_CoffeePLP",
                  position: "TopBanner_CoffeePLP",
                },
              ],
            },
          },
        });
      });

    data.unsubscribe();
  })
  // .executeOnMismatch(function (data) {
  //   console.log("mismatch");
  //   console.log(data);
  // })
  .evaluate();
