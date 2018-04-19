<template lang="pug">
main
  h1 Vue MDC Web
  p This is a Vue Component wrapper for the official Material Design Components Web using the Foundation Adapters
  p Why this package over others? This package is focused of staying up to date and to follow the Vue Style Guides to ensure good Vue performance
  p All the props try to stay as close to the name of the MDC CSS class names so you can read both documentations without any abstraction so that both documentations can work together.
  p As the #[a(href="//material.io/components/web/", target="_blank") material.io] documentation is good to read to getmore in depth of the material design framework.

  p To download the package type this into npm
  p npm -i vue-mdc-web

  p Or if you use yarn type
  p yarn add vue-mdc-web
</template>

<script>
export default {
  name: "DemoHome"
};
</script>