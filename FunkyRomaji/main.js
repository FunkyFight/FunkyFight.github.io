var app = new Vue({
    'el': '#el',
    'data': {
        japanese_text: "",
        mode_text: "Mode Hiragana",
        mode: 0,
        lastmode: 0,
        change_count: 0,
        max: 2,
        regex: "",
        current_kanjimap: {}
    },
    'methods': {
        translate: function() {
            var text = app.$data.japanese_text;
            
            if(text.includes("/")) {
                var code = text.match(/\/(.*?)\//g)
    
                if(code == null) return;
                var excode = code[0].replaceAll("/", "")
                
                switch(excode) {
                    case "h":
                        setMode(0)
                        app.$data.japanese_text = text.replaceAll(code, "")
                        break;
                    case "k":
                        setMode(1)
                        app.$data.japanese_text = text.replaceAll(code, "")
                        break;
                    default:
                        app.$data.japanese_text = text.replaceAll(code, "")
                        fetch("https://jisho.org/api/v1/search/words?keyword="+excode)
                        .then((response) => response.json())
                        .then(x => {
                            app.$data.japanese_text += x.data[0].slug
                        })
                }

            } else {
                
                app.$data.change_count += 1
                if(app.$data.change_count == app.$data.max) {
                    
                    app.$data.japanese_text = ""
                    if(app.$data.mode != 2) {
                        var toTranslate = text.replaceAll(/([ぁ-んァ-ン一-龯])/g, "");
                        console.log(toTranslate)
                        app.$data.regex = toTranslate
                        text = text.replaceAll(toTranslate, "");
                        switch(app.$data.mode) {
                            case 0:
                                

                                var c = wanakana.toHiragana(toTranslate)
                                app.$data.japanese_text += text + c
                                
                                break;
                            case 1:
                                
                                var c = wanakana.toKatakana(toTranslate)
                                app.$data.japanese_text = text + c
                                break;
                        }
                        
                    }
                    app.$data.change_count = 0
                    if(app.$data.max == 2) {
                        app.$data.max = 1 
                        return
                    }
                    if(app.$data.max == 1) {
                        app.$data.max = 2
                        return
                    }
                    
                }
                
            }
            
            
            
        }
    }
})

function setMode(mode) {
    switch(mode) {
        case 0: 
            app.$data.mode_text = "Mode Hiragana"
            app.$data.lastmode = app.$data.mode
            app.$data.mode = 0
            break;
        case 1: 
            app.$data.mode_text = "Mode Katakana"
            app.$data.lastmode = app.$data.mode
            app.$data.mode = 1
            break;
    }
}