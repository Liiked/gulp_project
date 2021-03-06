Vue.component("child", {
    props: ["myMessage"],
    template: "<span>{{ normalizedSize }}</span>",
    computed: {
        normalizedSize: function() {
            return this.myMessage.trim().toLowerCase()
        }
    }
}), new Vue({
    el: "#component",
    data: {
        parentMsg: ""
    }
}), Vue.component("button-counter", {
    template: '<button v-on:click="increment">{{ counter }}</button>',
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        increment: function() {
            this.counter += 1, this.$emit("increment")
        }
    }
}), new Vue({
    el: "#counter-event-example",
    data: {
        total: 0
    },
    methods: {
        incrementTotal: function() {
            this.total += 1
        }
    }
});