'use babel';

import JavaCodingShortcutsView from './java-coding-shortcuts-view';
import { CompositeDisposable } from 'atom';

export default {

  javaCodingShortcutsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.javaCodingShortcutsView = new JavaCodingShortcutsView(state.javaCodingShortcutsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.javaCodingShortcutsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'java-coding-shortcuts:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.javaCodingShortcutsView.destroy();
  },

  serialize() {
    return {
      javaCodingShortcutsViewState: this.javaCodingShortcutsView.serialize()
    };
  },

  fetch() {
  let editor
  if (editor = atom.workspace.getActiveTextEditor()) {

    let selection = editor.getSelectedText()
    selection=selection.trim();
    selection=selection.toLowerCase();

    let output="";

    if (selection == "fr"){ // shortcut for for loop with variable i
      output = "for(int i=0;i< ;i+=1){\n\n}";
    }

    else if (selection.slice(0,2)=="fr"){ // shortcut for for loop with some variable
      let variable = selection.slice(3,selection.length);
      output = "for(int "+variable+"=0;"+variable+"< ;"+variable+"+=1){\n\n}";
    }

    else if (selection == "ie"){ // shortcut for if else
      output = "if( ){\n\n}\nelse{\n\n}";
    }

    else if (selection == "iec"){ // shortcut for adding else if element
      output = "else if( ){\n\n}";
    }

    else if (selection == "wh"){ // shortcut for while loop
      output = "while( ){\n\n}";
    }

    else if (selection.slice(0,2) == "pl"){ // shortcut for printline
      output = "System.out.println("+selection.slice(3,selection.length)+");";
    }

    else if (selection.slice(0,1) == "p"){ // shortcut for print
      output = "System.out.print("+selection.slice(2,selection.length)+");";
    }

    else if (selection == "main"){ // shortcut for main function
      output = "public static void main (String[] args){\n\n}";
    }

    editor.insertText(output)
  }
}

};
