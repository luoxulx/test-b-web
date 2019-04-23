<template>
  <article-form :is-edit="false" submit-button="Create" />
</template>

<script>
import ArticleForm from './components/ArticleForm'
export default {
  name: 'CreateArticle',
  components: { ArticleForm }
}
</script>
