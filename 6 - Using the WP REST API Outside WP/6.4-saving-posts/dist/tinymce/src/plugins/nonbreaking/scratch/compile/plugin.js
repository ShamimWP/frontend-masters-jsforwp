/*jsc
["tinymce.plugins.nonbreaking.Plugin","tinymce.core.PluginManager","global!tinymce.util.Tools.resolve"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the nonbreaking plugin.
 *
 * @class tinymce.nonbreaking.Plugin
 * @private
 */
define(
  'tinymce.plugins.nonbreaking.Plugin',
  [
    'tinymce.core.PluginManager'
  ],
  function (PluginManager) {
    PluginManager.add('nonbreaking', function (editor) {
      var setting = editor.getParam('nonbreaking_force_tab');

      editor.addCommand('mceNonBreaking', function () {
        editor.insertContent(
          (editor.plugins.visualchars && editor.plugins.visualchars.state) ?
            '<span class="mce-nbsp">&nbsp;</span>' : '&nbsp;'
        );

        editor.dom.setAttrib(editor.dom.select('span.mce-nbsp'), 'data-mce-bogus', '1');
      });

      editor.addButton('nonbreaking', {
        title: 'Nonbreaking space',
        cmd: 'mceNonBreaking'
      });

      editor.addMenuItem('nonbreaking', {
        text: 'Nonbreaking space',
        cmd: 'mceNonBreaking',
        context: 'insert'
      });

      if (setting) {
        var spaces = +setting > 1 ? +setting : 3;  // defaults to 3 spaces if setting is true (or 1)

        editor.on('keydown', function (e) {
          if (e.keyCode == 9) {

            if (e.shiftKey) {
              return;
            }

            e.preventDefault();
            for (var i = 0; i < spaces; i++) {
              editor.execCommand('mceNonBreaking');
            }
          }
        });
      }
    });

    return function () { };
  }
);