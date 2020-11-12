<template>
  <header class="shadow w-screen">
    <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
      <router-link
        :to="{
          name: 'home'
        }"
        class="flex items-center flex-shrink-0 text-white mr-6"
      >
        <px-icon class="mr-2"></px-icon>
        <span class="font-semibold text-xl tracking-tight">Exchange</span>
      </router-link>
      <router-link :to="{ name: 'about' }">
        <span class="text-white font-semibold text-xl tracking-tight">
          About
        </span>
      </router-link>
      <div
        class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto"
      >
        <div class="text-sm lg:flex-grow">
          <router-link
            v-for="l in linksHeader"
            :key="l.title"
            :to="l.to"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            {{ l.title }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import pxIcon from '@/components/pxIcon';
export default {
  name: 'pxHeader',
  props: {
    linksHeader: {
      type: Array,
      default: () => []
    }
  },
  components: {
    pxIcon
  }
};
</script>
