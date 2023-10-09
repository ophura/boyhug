"use strict";
var AnchorTarget;
(function (AnchorTarget) {
    AnchorTarget["Self"] = "_self";
    AnchorTarget["Blank"] = "_blank";
    AnchorTarget["Parent"] = "_parent";
    AnchorTarget["Top"] = "_top";
})(AnchorTarget || (AnchorTarget = {}));
const IsDevEnv = () => {
    return ['127.0.0.1', 'localhost', '::1', ''].includes(location.hostname);
};
const SetAndUpperCasePageTitle = () => {
    if (!IsDevEnv())
        document.title = location.hostname.toUpperCase();
};
const GetDaddyDomainName = async () => {
    const CNAMEURL = 'https://raw.githubusercontent.com/ophura/will-do-it-tomorrow/e7a459a99bb0375fbcce6a2fa7efd9e70661defb/CNAME';
    let daddyDomain = sessionStorage.getItem('daddyDomain');
    if (daddyDomain)
        return daddyDomain;
    console.log('fire!');
    try {
        const response = await fetch(CNAMEURL);
        const canonicalName = await response.text();
        daddyDomain = canonicalName;
    }
    catch (error) {
        daddyDomain = 'ophura.com';
        if (IsDevEnv())
            console.error(error);
    }
    sessionStorage.setItem('daddyDomain', daddyDomain);
    return daddyDomain;
};
const SetFooterDaddylURL = () => {
    GetDaddyDomainName().then(dname => {
        const anchor = document.createElement('a');
        anchor.innerText = dname;
        anchor.href = `https://${dname}`;
        anchor.target = AnchorTarget.Blank;
        const para = document.createElement('p');
        para.innerText = 'daddy domain: ';
        para.appendChild(anchor);
        const footer = document.createElement('footer');
        footer.appendChild(para);
        document.body.appendChild(footer);
    });
};
const setup = () => {
    SetAndUpperCasePageTitle();
    SetFooterDaddylURL();
};
setup();
