<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import codesample from './codesample'
import load from './dynamicLoadScript'
import { uploadToken, saveFileInfo } from '@/api'
import { parseFileSize } from '@/utils'
const tinymceCDN = 'https://cdn.tiny.cloud/1/ur9ww0d6omfe1qfno8hinl417ubih0jn2rd6svs30q2jmwpq/tinymce/5/tinymce.min.js' // 设置为仅 *.lnmpa.top 可用
export default {
  name: 'Tinymce5',
  components: {},
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      cdnHost: 'https://net.lnmpa.top/',
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    },
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      // const globalcounter = 1
      window.tinymce.init({
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        toolbar_items_size: 'small',
        plugins: plugins,
        codesample_languages: codesample,
        // codesample_content_css: [''],
        menubar: this.menubar,
        // language: this.language,
        // lx-new-start
        tinydrive_token_provider: process.env.VUE_APP_BASE_API + 'auth/tiny/token',
        tinydrive_dropbox_app_key: 'aaa2',
        // tinydrive_google_drive_key: 'aaa3',
        // tinydrive_google_drive_client_id: 'aaa4',
        // lx-end
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        language_url: 'https://cdn.jsdelivr.net/npm/tinymce-lang/langs/zh_CN.js',
        height: this.height,
        body_class: 'panel-body',
        object_resizing: true,
        spellchecker_dialog: true,
        spellchecker_whitelist: ['Ephox', 'Moxiecode'],
        tinycomments_mode: 'embedded',
        // browser_spellcheck: true,
        // spellchecker_rpc_url: process.env.VUE_APP_BASE_API + 'open/tiny/spellchecker',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        // paste_retain_style_properties: 'all', // 不过滤
        // paste_word_valid_elements: 'all', // 不过滤
        paste_data_images: true,
        // paste_convert_word_fake_lists: false, // 还是要过滤，不然太脏
        // paste_webkit_styles: 'all', // 不过滤
        // paste_enable_default_filters: false, // 不过滤
        paste_merge_formats: true,
        paste_auto_cleanup_on_paste: false,
        paste_postprocess(plugin, args) {
          // console.log(args.node)
          // 应该服务端抓取远程所有 img 标签 src 并保存，返回 url，然后整体替换
        },
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        image_title: false,
        image_advtab: true,
        image_caption: true,
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i', '//www.tiny.cloud/css/codepen.min.css'],
        content_style: '.mce-annotation { background: #fff0b7; } .tc-active-annotation {background: #ffe168; color: black; }',
        importcss_append: true,
        template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        images_upload_credentials: true,
        images_dataimg_filter(img) {
          setTimeout(() => {
            // base64 转换为 blob 图像
            const $image = window.$(img)
            $image.removeAttr('width')
            $image.removeAttr('height')
            if ($image[0].height && $image[0].width) {
              $image.attr('data-wscntype', 'image')
              $image.attr('data-wscnh', $image[0].height)
              $image.attr('data-wscnw', $image[0].width)
              $image.addClass('wscnph')
            }
          }, 0)

          return img
        },
        images_upload_handler(blobInfo, success, failure, progress) {
          progress(0)

          uploadToken({ key: 'editor' }).then(response => {
            progress(50)
            const uri = response.data.uri
            const uploadFormData = new FormData()
            uploadFormData.append('token', response.data.token)
            uploadFormData.append('key', response.data.key)
            uploadFormData.append('file', blobInfo.blob())
            progress(60)
            fetch(uri, { method: 'post', body: uploadFormData }).then(res => {
              progress(95)
              res.json().then(result => {
                if (result.error) {
                  failure(result.error)
                  return false
                }
                progress(100)
                console.log(1, blobInfo.blob())
                const tempData = {
                  path: result.key,
                  url: this.cdnHost + result.key + '-pic540',
                  size: parseFileSize(blobInfo.blob().size),
                  mime: blobInfo.blob().type,
                  original_name: blobInfo.blob().name,
                  hash: result.hash
                }
                success(tempData.url)

                saveFileInfo(tempData).then(res2 => {
                  console.log(res2)
                })
              })
            }).catch(error => {
              failure(error)
            })
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }
  }
}
</script>

<style scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
  }
  .tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
