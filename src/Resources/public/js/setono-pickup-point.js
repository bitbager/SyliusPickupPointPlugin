(function ($) {
    $(function () {
        $('input.input-shipping-method').findPickupPoints();
        $('input.input-shipping-method:checked').change();
    });
})(jQuery);

(function ($) {
    'use strict';

    $.fn.extend({
        findPickupPoints: function () {
            return this.each(function () {
                let $element = $(this);
                let method = $(this).val();
                let $container = $('div[data-pickup-point-method="' + method + '"]');
                let url = $element.data('pickup-point-provider-url');
                let csrfToken = $element.data('csrf-token');

                if (!url) {
                    return;
                }

                $element.api({
                    method: 'GET',
                    on: 'change',
                    cache: false,
                    url: url,
                    beforeSend: function (settings) {
                        settings.data = {
                            _csrf_token: csrfToken
                        };

                        $container.closest('form').addClass('loading');

                        return settings;
                    },
                    onSuccess: function (response) {
                        addPickupPoints($container, response);

                    },
                    onFailure: function (response) {
                        console.log(response);
                    },
                    onComplete: function () {
                        $container.closest('form').removeClass('loading');
                    }
                });
            });
        }
    });

    function bindPickupPointsSelection() {
        $('.setono-pickup-point-value').change(function () {
            let method = $(this).closest('.setono-pickup-points-container').data('pickup-point-method');

            $('input[data-pickup-point-method="' + method + '"]').val($(this).val())
        });
    }

    function removePickupPoints() {
        $('.setono-pickup-points-container').empty();
    }

    function addPickupPoints($container, pickupPoints) {
        removePickupPoints();

        let list = '';

        for (let i in pickupPoints) {
            let pickupPoint = pickupPoints[i];

            list +=
                '<div class="field pickup-points-list">' +
                '<div class="ui radio checkbox">' +
                '<input class="setono-pickup-point-value" data-pickup-point-id="' + pickupPoint.id + '" id="pickup-point-' + pickupPoint.id + '" type="radio" name="pickup-point" tabindex="0" class="hidden setono-pickup-point-value">' +
                '<label for="pickup-point-' + pickupPoint.id + '">' + pickupPoint.address + '</label>' +
                '</div>' +
                '</div>'
            ;
        }

        $container.append(list);

        bindPickupPointsSelection();
    }
})(jQuery);
