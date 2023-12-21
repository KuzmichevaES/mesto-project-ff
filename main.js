(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.target.classList.contains("popup_is-opened")&&n(e.target)}e.d({},{OP:()=>j});var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"c6822e76-741a-4299-92d5-816e7931a995","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function u(e,t,n,r,o){var c=j.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__like-button"),u=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__number-of-likes");return u.src=e.link,u.alt=e.name,c.querySelector(".card__title").textContent=e.name,l.textContent=e.likes.length,a.addEventListener("click",(function(){return n(e._id,a,l)})),u.addEventListener("click",(function(t){return r(t,e)})),o._id!=e.owner._id?i.remove():i.addEventListener("click",(function(){return t(c,e._id)})),!0===function(e,t){return e.likes.some((function(e){return e._id===t._id}))}(e,o)&&a.classList.add("card__like-button_is-active"),c}function i(e,t){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return a(e)}))})(t).then((function(t){e.remove()})).catch((function(e){console.log(e)}))}function l(e,t,n){t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return a(e)}))}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then((function(e){return a(e)}))}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)},d=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){s(e,n,t)}))},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__image-edit"),y=(document.querySelectorAll(".card__image"),document.querySelector(".profile__add-button")),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_profile_image-edit"),S=document.querySelector(".popup_type_new-card"),b=S.querySelector(".popup__button"),g=document.querySelectorAll(".popup__close"),q=document.querySelectorAll(".popup"),C=document.querySelector('form[name="edit-profile"]'),k=document.querySelector('form[name="new-profile_image"]'),E=document.querySelector('form[name="new-place"]'),L=document.querySelector(".profile__image"),x=document.querySelector(".popup__input-new-profile_image"),A=document.querySelector(".popup__input_type_name"),w=document.querySelector(".popup__input_type_description"),O=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),j=document.querySelector("#card-template").content,D=document.querySelector('form[name="new-place"]'),P=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),B=document.querySelector(".popup_type_image"),I=document.querySelector(".popup__image"),M=document.querySelector(".popup__caption"),N=document.querySelector(".places__list");Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(e){return a(e)})),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(e){return a(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];O.textContent=o.name,U.textContent=o.about,L.style.backgroundImage="url("+o.avatar+")",c.forEach((function(e){var t=u(e,i,l,V,o);N.append(t)}))})).catch((function(e){console.log(e)}));var J,H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function V(e,n){e.preventDefault(),I.src=n.link,I.alt=n.name,M.textContent=n.name,t(B)}J=H,Array.from(document.querySelectorAll(J.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(e,J)})),m.addEventListener("click",(function(e){e.preventDefault(),d(v,H),A.value=O.textContent,w.value=U.textContent,t(v)})),C.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.querySelector(".popup__button");r.textContent="Сохранение...",(t={name:A.value,about:w.value},fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:t.name,about:t.about})}).then((function(e){return a(e)}))).then((function(e){O.textContent=e.name,U.textContent=e.about,n(v),r.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),_.addEventListener("click",(function(e){e.preventDefault(),t(h)})),k.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.querySelector(".popup__button");r.textContent="Сохранение...",(t={avatar:x.value},fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:t.avatar})}).then((function(e){return a(e)}))).then((function(e){L.style.backgroundImage="url("+e.avatar+")",n(h),r.textContent="Сохранить",k.reset()})).catch((function(e){console.log(e)}))})),y.addEventListener("click",(function(e){e.preventDefault(),E.reset(),d(S,H),function(e,t,n){var r=Array.from(e.querySelectorAll(n.inputSelector));p(r,t,n)}(E,b,H),t(S)})),D.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.querySelector(".popup__button");r.textContent="Сохранение...",(t={name:P.value,link:T.value},fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t.name,link:t.link})}).then((function(e){return a(e)}))).then((function(e){var t=u(e,i,l,V,e.owner);N.prepend(t),n(S),r.textContent="Сохранить",D.reset()})).catch((function(e){console.log(e)}))})),g.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(e){n(t)}))})),q.forEach((function(e){e.addEventListener("click",o)}))})();