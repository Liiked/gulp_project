define(function() {
    is_login = false
    return {
        good: function() {
            $.ajax({
                type: "get",
                url: "/api/program?a=get_cart_num",
                dataType: "json",
                success: function(response) {
                    console.log(response);
                }
            });
        }
    }
});