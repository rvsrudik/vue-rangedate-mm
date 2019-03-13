// import plugin from './RangedatePicker.vue'
//
// export default {
//   install: function (Vue, options) {
//     Vue.component(plugin.name, plugin)
//   }
// }



import Component from './RangedatePicker.vue';

const Plugin = (Vue, params) => {
    let name = 'vue-rangedate-picker';
    /* istanbul ignore else */
    if (typeof params === 'string') name = params;

    Vue.component(name, Component);
};

Component.install = Plugin;

export default Component;
export {Component, Plugin};
