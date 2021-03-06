var vm = new Vue({
        el: "#example",
        data: {
            message: "hello"
        },
        methods: {
            reversedMessage: function() {
                return this.message.split("").reverse().join("")
            },
            now: function() {
                return Date.now()
            }
        }
    }),
    watchExampleVM = new Vue({
        el: "#watch-example",
        data: {
            question: "",
            answer: "I cannot give you an answer until you ask a question!"
        },
        watch: {
            question: function(e) {
                this.answer = "Waiting for you to stop typing...", this.getAnswer()
            }
        },
        methods: {
            getAnswer: function() {
                var e = this;
                if (console.log("ff"), this.question.indexOf("?") === -1) return void(e.answer = "Questions usually contain a question mark. ;-)");
                e.answer = "Thinking...", setTimeout(function() {
                    e.answer = "Good job!"
                }, 1e3)
            }
        }
    });

$.ajax({
    type: "get",
    url: "/api/program?a=get_cart_num",
    dataType: "json",
    success: function(response) {
        console.log('jajaja')
    },
    error: function() {
        alert('fail')
    }
});