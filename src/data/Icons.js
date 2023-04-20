const iconsArray = [
    ["aht", "/assets/icons/aht.svg"],
    ["comet", "/assets/icons/comet.png"],
    ["cypx", "/assets/icons/cypx.png"],
    ["egio", "/assets/icons/egio.svg"],
    ["epos", "/assets/icons/epos.svg"],
    ["erdoge", "/assets/icons/erdoge.svg"],
    ["ergo", "/assets/icons/ergo.svg"],
    ["ergold", "/assets/icons/ergold.svg"],
    ["ergone", "/assets/icons/ergone.svg"],
    ["ergopad", "/assets/icons/ergopad.svg"],
    ["ermoon", "/assets/icons/ermoon.svg"],
    ["exle", "/assets/icons/exle.svg"],
    ["flux", "/assets/icons/flux.svg"],
    ["getblock", "/assets/icons/getblock.svg"],
    ["kushti", "/assets/icons/kushti.svg"],
    ["love", "/assets/icons/love.png"],
    ["lunadog", "/assets/icons/lunadog.png"],
    ["migoreng", "/assets/icons/migoreng.svg"],
    ["neta", "/assets/icons/neta.svg"],
    ["paideia", "/assets/icons/paideia.svg"],
    ["proxie", "/assets/icons/proxie.png"],
    ["quacks", "/assets/icons/quacks.svg"],
    ["sigrsv", "/assets/icons/sigrsv.svg"],
    ["sigusd", "/assets/icons/sigusd.svg"],
    ["spf", "/assets/icons/spf.svg"],
    ["terahertz", "/assets/icons/terahertz.svg"],
    ["walrus", "/assets/icons/walrus.png"],
    ["woodennickels", "/assets/icons/woodennickels.svg"]
];

const iconsMap = new Map(iconsArray);

const Icons = (tokenName) => {
    const name = tokenName.toLowerCase();
    let iconResult;
    if (iconsMap.has(name))
        iconResult = iconsMap.get(name);

    return iconResult;
}

export default Icons;
