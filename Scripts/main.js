
exports.activate = function() {
    // Do work when the extension is activated
}

exports.deactivate = function() {
    // Clean up "state" before 'the' extension is deactivated
}

function encodeSimple(s, opSingleLine){
    let opTrimWhite = nova.config.get("stringencode.trimwhite", "boolean");
    console.log("opTrimWhite=" + opTrimWhite);
    if (!s.endsWith('\n')) {
        s += '\n';
    }
    var out = '"' + s.replace(/"/g, '\\\"');
    if(!opSingleLine){
        out = out.replace(/\n/g, '\\n\' + \n"');
        out = out.replace(/" \+ \n"$/, '');
    }else{
        if(opTrimWhite){
            out = out.replace(/\n\s*/g, '\\n');
        }else{
            out = out.replace(/\n/g, '\\n');
        }
    }
    
    out += '"';
    
    return out;
}
nova.commands.register("stringencode.encodeSimple", (workspace) => {
    let editor = nova.workspace.activeTextEditor;
    var selectedRanges = editor.selectedRanges.reverse();
    editor.edit(function(e) {
        for (var range of selectedRanges) {
            var text = editor.getTextInRange(range);
            var newText = encodeSimple(text, false);
            e.replace(range, newText);
        }
    });
});
nova.commands.register("stringencode.encodeSingle", (workspace) => {
    let editor = nova.workspace.activeTextEditor;
    var selectedRanges = editor.selectedRanges.reverse();
    editor.edit(function(e) {
        for (var range of selectedRanges) {
            var text = editor.getTextInRange(range);
            var newText = encodeSimple(text, true);
            e.replace(range, newText);
        }
    });
});


