<template>
  <article-form :is-edit="true" submit-button="Confirm Edit" />
</template>

<script>
import ArticleForm from './components/ArticleForm'
export default {
  name: 'EditArticle',
  components: { ArticleForm }
}
</script>
