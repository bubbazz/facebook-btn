//alert("test!")
//export { DestroyBtn };
const ID = "JAAAAR-12345"
const btn = document.createElement('input');
let btncolor = 'green';
let text = "";
function createBtn() {
    //btn = document.createElement('input')
    btn.id = ID
    btn.type = 'button'
    btn.value = 'NEW BUTTON'
    chrome.storage.sync.get("showBtn", ({ showBtn }) => {
        btn.style.display = showBtn ? "block" : "none";
    });
    chrome.storage.sync.get("color", ({ color }) => {
        btncolor = color;
        btn.style.backgroundColor = text.length > 0 ? color : "gray";
    });
    btn.addEventListener('click', () => {
        alert(text);
        chrome.runtime.sendMessage({ text: text }, function (response) {
            console.log(response);
        });
    })
}

function EmmbedBtn() {
    document.addEventListener("DOMSubtreeModified", function () {
        //text_span = document.querySelector('div [aria-label="Was machst du gerade?"] [data-text="true"]');
        // maybe better if fetch all languages
        let spanLst = document.querySelectorAll('div.l9j0dhe7.du4w35lb.cjfnh4rs.j83agx80.cbu4d94t.lzcic4wl.ni8dbmo4.stjgntxs.oqq733wu.cwj9ozl2.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.nwpbqux9.iy3k6uwz.e9a99x49.g8p4j16d.bv25afu3.d2edcug0 [data-text="true"]');
        if (spanLst.length > 0) {
            text = ""
            spanLst.forEach((span) => {
                text += span.innerHTML + "\n";
            })
            text = text.slice(0, -1)
            btn.style.backgroundColor = text.length > 0 ? btncolor : "gray";
            btn.disabled = text.length == 0
        }
        let divPost = document.querySelector('div.l9j0dhe7.du4w35lb.cjfnh4rs.j83agx80.cbu4d94t.lzcic4wl.ni8dbmo4.stjgntxs.oqq733wu.cwj9ozl2.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.nwpbqux9.iy3k6uwz.e9a99x49.g8p4j16d.bv25afu3.d2edcug0')
        //let divPost = document.querySelector('div.l9j0dhe7.du4w35lb.cjfnh4rs.j83agx80.cbu4d94t.lzcic4wl.ni8dbmo4.stjgntxs.oqq733wu.cwj9ozl2.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.nwpbqux9.iy3k6uwz.e9a99x49.g8p4j16d.bv25afu3.d2edcug0 [aria-label="Posten"]')
        if (divPost !== null && document.getElementById(ID) === null) {
            divPost.append(btn);
            //divPost.after(btn);
        }
    });
}

createBtn();
EmmbedBtn();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse(request);
        btn.style.display = request.showBtn ? "block" : "none";
        if (request.color) {
            btncolor = request.color;
            btn.style.backgroundColor = text.length > 0 ? btncolor : "gray";
        }
        console.log(request);
        //return true;
    }
);