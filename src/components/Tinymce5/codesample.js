// This configuration option enables you to set a list of languages to be displayed in the languages drop down.
const codesample = [
  { text: 'Markup + HTML + XML + SVG + MathML', value: 'markup' },
  { text: 'C-like', value: 'clike' },
  { text: 'JavaScript', value: 'javascript' },
  { text: 'ABAP', value: 'abap' },
  { text: 'ActionScript', value: 'actionscript' },
  { text: 'Apache Configuration', value: 'apacheconf' },
  { text: 'APL', value: 'apl' },
  { text: 'AppleScript', value: 'applescript' },
  { text: 'AsciiDoc', value: 'asciidoc' },
  { text: 'ASP.NET (C#)', value: 'aspnet' },
  { text: 'AutoIt', value: 'autoit' },
  { text: 'AutoHotkey', value: 'autohotkey' },
  { text: 'Bash', value: 'bash' },
  { text: 'BASIC', value: 'basic' },
  { text: 'Batch', value: 'batch' },
  { text: 'Bison', value: 'bison' },
  { text: 'Brainfuck', value: 'brainfuck' },
  { text: 'Bro', value: 'bro' },
  { text: 'C', value: 'c' },
  { text: 'C#', value: 'csharp' },
  { text: 'C++', value: 'cpp' },
  { text: 'CoffeeScript', value: 'coffeescript' },
  { text: 'Crystal', value: 'crystal' },
  { text: 'CSS', value: 'css' },
  { text: 'CSS Extras', value: 'css-extras' },
  { text: 'CIL', value: 'cil' },
  { text: 'D', value: 'd' },
  { text: 'Dart', value: 'dart' },
  { text: 'Diff', value: 'diff' },
  // { text: 'Django/Jinja2', value: 'django' },
  { text: 'Docker', value: 'docker' },
  { text: 'Eiffel', value: 'eiffel' },
  { text: 'Elixir', value: 'elixir' },
  { text: 'Erlang', value: 'erlang' },
  { text: 'F#', value: 'fsharp' },
  { text: 'Fortran', value: 'fortran' },
  { text: 'Gherkin', value: 'gherkin' },
  { text: 'Git', value: 'git' },
  { text: 'GLSL', value: 'glsl' },
  { text: 'Go', value: 'go' },
  { text: 'Groovy', value: 'groovy' },
  { text: 'Haml', value: 'haml' },
  { text: 'Handlebars', value: 'handlebars' },
  { text: 'Haskell', value: 'haskell' },
  { text: 'Haxe', value: 'haxe' },
  { text: 'HTTP', value: 'http' },
  { text: 'Icon', value: 'icon' },
  { text: 'Inform 7', value: 'inform7' },
  { text: 'Ini', value: 'ini' },
  { text: 'J', value: 'j' },
  { text: 'Jade', value: 'jade' },
  { text: 'Java', value: 'java' },
  { text: 'JSON', value: 'json' },
  { text: 'Julia', value: 'julia' },
  { text: 'Keyman', value: 'keyman' },
  { text: 'Kotlin', value: 'kotlin' },
  { text: 'LaTeX', value: 'latex' },
  { text: 'Less', value: 'less' },
  { text: 'LOLCODE', value: 'lolcode' },
  { text: 'Lua', value: 'lua' },
  { text: 'Makefile', value: 'makefile' },
  { text: 'Markdown', value: 'markdown' },
  { text: 'MATLAB', value: 'matlab' },
  { text: 'MEL', value: 'mel' },
  { text: 'Mizar', value: 'mizar' },
  { text: 'Monkey', value: 'monkey' },
  { text: 'NASM', value: 'nasm' },
  { text: 'Nginx', value: 'nginx' },
  { text: 'Nim', value: 'nim' },
  { text: 'Nix', value: 'nix' },
  { text: 'NSIS', value: 'nsis' },
  { text: 'Objective-C', value: 'objectivec' },
  { text: 'OCaml', value: 'ocaml' },
  { text: 'Oz', value: 'oz' },
  { text: 'PARI/GP', value: 'parigp' },
  { text: 'Parser', value: 'parser' },
  { text: 'Pascal', value: 'pascal' },
  { text: 'Perl', value: 'perl' },
  { text: 'PHP', value: 'php' },
  { text: 'PHP Extras', value: 'php-extras' },
  { text: 'PowerShell', value: 'PowerShell' },
  { text: 'Processing', value: 'processing' },
  { text: 'Prolog', value: 'prolog' },
  { text: 'Protocol Buffers', value: 'protobuf' },
  { text: 'Puppet', value: 'puppet' },
  { text: 'Pure', value: 'pure' },
  { text: 'Python', value: 'Python' },
  { text: 'Q', value: 'q' },
  { text: 'Qore', value: 'qore' },
  { text: 'R', value: 'R' },
  { text: 'React JSX', value: 'jsx' },
  { text: 'reST (reStructuredText)', value: 'rest' },
  { text: 'Rip', value: 'rip' },
  { text: 'Roboconf', value: 'roboconf' },
  { text: 'Regex', value: 'Regex' },
  { text: 'Ruby', value: 'Ruby' },
  { text: 'Rust', value: 'rust' },
  { text: 'SAS', value: 'sas' },
  { text: 'Sass (Sass)', value: 'sass' },
  { text: 'Scss (Scss)', value: 'scss' },
  { text: 'Scala', value: 'scala' },
  { text: 'Scheme', value: 'scheme' },
  { text: 'Smalltalk', value: 'smalltalk' },
  { text: 'Smarty', value: 'smarty' },
  { text: 'SQL', value: 'sql' },
  { text: 'Stylus', value: 'stylus' },
  { text: 'Swift', value: 'Swift' },
  { text: 'Tcl', value: 'tcl' },
  { text: 'Textile', value: 'textile' },
  { text: 'Twig', value: 'twig' },
  { text: 'TypeScript', value: 'typescript' },
  { text: 'Verilog', value: 'verilog' },
  { text: 'VHDL', value: 'vhdl' },
  { text: 'vim', value: 'vim' },
  { text: 'Wiki markup', value: 'wiki' },
  { text: 'YAML', value: 'yaml' }
]
export default codesample
