<template>
  <v-list nav dense>
    <template v-for="(item, index) in items">
      <v-list-item
        v-if="!item.children"
        :key="`${item.title}${index}`"
        :to="resolvePath(basePath, item.path)"
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-else
        :key="item.title"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(subItem, subIndex) in item.children"
          :key="`${subItem.title}${subIndex}`"
          :to="resolvePath(item.path,subItem.path)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <SideBarItemList :items="item.children" :base-path="item.path" /> -->
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import path from 'path'

export default {
  name: 'SideBarItemList',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(basePath, subPath) {
      return path.resolve(basePath, subPath)
    }
  }
}
</script>

<style scoped>

</style>
