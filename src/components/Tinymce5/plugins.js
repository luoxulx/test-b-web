// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
const plugins = [
  // 'tinydrive advlist anchor autolink autoresize autosave bbcode charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print quickbars save searchreplace spellchecker tabfocus table template textpattern toc visualblocks visualchars wordcount'
  // 'tinydrive print preview fullpage autoresize searchreplace autolink directionality visualblocks emoticons visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help paste importcss'
  // 禁止使用 fullpage 插件!
  'print preview searchreplace autolink directionality visualblocks code visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help paste'
]
export default plugins
