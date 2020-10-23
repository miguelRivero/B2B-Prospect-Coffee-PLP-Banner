//import "../styles/fonts.scss";
//import "../styles/index.scss";

// import * as data from "./translation_en.json";
// const word = data.name;
// console.log(word); // output 'testing'

// if (process.env.NODE_ENV === 'development') {
//   require('../index.html');
// }
//const styleBanner = `@font-face{font-family:NespressoLucas-Bold;src:url(/shared_res/agility/commons/fonts/NespressoLucas-Bold.woff) format("woff");font-style:normal;font-weight:700}@font-face{font-family:NespressoLucas-XtraBd;src:url(/shared_res/agility/commons/fonts/NespressoLucas-XtraBd.woff) format("woff");font-style:normal;font-weight:800}.banner-prospects{height:128px;max-width:996px;background-color:#f6f4f2;margin:auto;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.banner-prospects-image{height:100%;width:25%;display:block;text-align:center;padding-top:16px}.text{width:85%;display:-webkit-box;display:-ms-flexbox;display:flex}.banner-prospects-text{color:#8f7247;font-family:"Nespresso Lucas";font-size:16px;letter-spacing:2px;line-height:24px;width:50%;margin:auto}.banner-prospects-text h2{color:#8f7247;font-size:16px;letter-spacing:2px;line-height:24px;font-weight:800}.banner-prospects-text p{color:#000;font-family:"Nespresso Lucas";font-size:14px;letter-spacing:1px;line-height:21px}.button-secondary{width:25%;margin:auto;display:inline-block}.button-secondary-link{color:#fff;font-family:"Nespresso Lucas";font-size:14px;font-weight:700;letter-spacing:1px;line-height:1.2em;text-align:center;background-color:#8f7247;position:relative;display:inline-block;text-align:center;border-radius:3px;cursor:pointer;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s;text-decoration:none;padding:.8em 2em;min-width:200px;border:1px solid #8f7247}@media screen and (max-width:764px){.banner-prospects{height:100%;padding:10px}.banner-prospects-image{width:30%}.text{width:70%;display:block}.banner-prospects-text{width:100%}.banner-prospects-text p{padding-bottom:9px}.button-secondary{width:100%}.button-secondary-link{width:100%}}`;
new casperEventHub.Experience("Prospects Banner Pro Member")
  .visitorIs({
    status: "anonymous",
  })
  .executeOnMatch(function (data) {
    // const styleBanner = `@font-face{font-family:NespressoLucas-Bold;src:url(/shared_res/agility/commons/fonts/NespressoLucas-Bold.woff) format("woff");font-style:normal;font-weight:700}@font-face{font-family:NespressoLucas-XtraBd;src:url(/shared_res/agility/commons/fonts/NespressoLucas-XtraBd.woff) format("woff");font-style:normal;font-weight:800}.banner-prospects{height:128px;max-width:996px;background-color:#f6f4f2;margin:auto;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.banner-prospects-image{height:100%;width:20%;display:block;text-align:center;padding-top:16px}.text{width:90%;display:-webkit-box;display:-ms-flexbox;display:flex}.banner-prospects-text{color:#8f7247;font-family:"Nespresso Lucas";font-size:16px;letter-spacing:2px;line-height:24px;width:60%;margin:auto}.banner-prospects-text h2{color:#8f7247;font-size:16px;letter-spacing:2px;line-height:21px;font-weight:800}.banner-prospects-text p{color:#000;font-family:"Nespresso Lucas";font-size:14px;letter-spacing:1px;line-height:20px}.button-secondary{width:25%;margin:auto;display:inline-block}.button-secondary-link{color:#fff;font-family:"Nespresso Lucas";font-size:14px;font-weight:700;letter-spacing:1px;line-height:1.2em;text-align:center;background-color:#8f7247;position:relative;display:inline-block;text-align:center;border-radius:3px;cursor:pointer;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s;text-decoration:none;padding:.8em 2em;min-width:200px;border:1px solid #8f7247}@media screen and (max-width:764px){.banner-prospects{height:100%;padding:10px}.banner-prospects-image{width:30%}.text{width:70%;display:block}.banner-prospects-text{width:100%}.banner-prospects-text p{padding-bottom:9px}.button-secondary{width:100%}.button-secondary-link{width:100%}}`;
    // const style = document.createElement("style");
    // //Appending StyleSheet
    // style.innerHTML = styleBanner;
    // document.head.appendChild(style);

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
    const mainEl = document.getElementById("main");
    const bannerContainer = document.createElement("div");
    const bannerContent = window.CoffeePLPBannerCopy[_market];

    bannerContainer.classList.add("PromotionBanner", "ProspectsBanner");
    mainEl.prepend(bannerContainer);
    bannerContainer.innerHTML = `
      <h2 class="VisuallyHidden">Promotional Banners</h2>
      <div class="banner-prospects">
        <div class="banner-prospects-image">
            <img src="/shared_res/mos/free_html/b2b/pdp_banner_coffee/img/Momento_120_3quarts_Left_Latte_OTG_L.png"></img>
        </div>
        <div class="text">
            <div class="banner-prospects-text">
                <h2>${bannerContent.heading[_lang]}</h2>
                <p>${bannerContent.subtext[_lang]}</p>
            </div>
            <div class="button-secondary">
                <a id="banner-prospects-button" class="button-secondary-link" href="/pro/au/en/order/machines/pro ">
                  <i aria-hidden="true"></i>
                  ${bannerContent.cta[_lang]}
                </a>
            </div>
        </div>
      </div>
      `;

    //Click event
    // document
    //   .getElementById("banner-prospects-button")
    //   .addEventListener("click", function () {
    //     //console.log("clicked");
    //   });

    data.unsubscribe();
  })
  // .executeOnMismatch(function (data) {
  //   console.log("mismatch");
  //   console.log(data);
  // })
  .evaluate();

// function getMarket() {
//   return config.defaults.addressCountry;
// }

// function getLang() {
//   if (!window.config) {
//     console.log("AB - window.config not found");
//   }
//   const ns = window.config.padl.namespace;
//   if (!ns) {
//     console.log("AB - padl.namespace not found");
//   }
//   const dataLayer = window[ns].dataLayer;
//   if (!dataLayer) {
//     console.log("AB - window[ns].dataLayer not found");
//   }
//   return window[ns].dataLayer.page.page.pageInfo.language;
// }
