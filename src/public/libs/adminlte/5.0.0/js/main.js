jQuery(function($) {
    
    function checkOpenSidebar() {
        let nb = $('.open').parents('ul').length - 1
        let counter = 1
        $('.open').parents('ul').each(function () {
            if (counter === nb) {
                $(this).parent().prev('a').css({'border-left-color':'#3c8dbc','color': '#fff', 'background': '#1e282c'})
            }
            $(this).parent().slideDown(200);
            $(this).parent().parent().addClass('active')
            $(this).parent().prev('a').children('.menu-dropdown').css('transform', 'rotate(-90deg)')
            counter += 1
        })
    }

    function activateSidebarLi(el) {
        if (el.parent().hasClass('active')) {
            let elementsActive = el.parent().find('.active')
            elementsActive.each(function () {
                $(this).removeClass('active')
                $(this).children().children('.menu-dropdown').css('transform', 'rotate(0)')
            })
            let allSubmenu = el.parent().find('.sidebar-submenu')
            allSubmenu.each(function () {
                $(this).slideUp(200);
            })
        }
        el.prev('.sidebar-submenu').slideUp(200);
        if (el.parent().hasClass('active')) {
            el.parent().removeClass('active');
            el.next('.sidebar-submenu').slideUp(200);
            el.children('.menu-dropdown').css('transform', 'rotate(0)')
        } else {
            el.next('.sidebar-submenu').slideDown(200);
            el.parent().addClass('active');
            el.children('.menu-dropdown').css('transform', 'rotate(-90deg)')
        }
    }

    $('.sidebar-item.sidebar-menu').find('a').each(function () {
        if ($(this).attr('href') === window.location.pathname) {
            if (!location.pathname.startsWith('#')) {
                $(this).parent().addClass('open')
                if (!$(this).parents('.sidebar-dropdown').length)
                    $(this).css({'color': '#fff', 'background': '#1e282c', 'border-left': '3px solid #3c8dbc', 'padding-left': '12px'})
            }
        }
    })

    checkOpenSidebar()

    $('.sidebar-dropdown > a').click(function() {
        if ($('.page-wrapper').hasClass('pinned') === false || window.matchMedia("(max-width: 769px)").matches) {
            activateSidebarLi($(this))
        } else {
            if ($(this).parents('ul').length !== 1) {
                activateSidebarLi($(this))
            }
        }
    });
    
    let pinned = 0
    $('.sidebar-wrapper').hover(function () {
        if (window.matchMedia("(min-width: 769px)").matches) {
            if ($('.page-wrapper').hasClass('pinned') === true) {
                $('.page-wrapper').removeClass('pinned')
                pinned = 1
                $('.page-wrapper .page-content').css({'margin-left': '50px'})
                $('.page-wrapper .main-footer').css({'margin-left': '50px'})
                checkOpenSidebar()
            }
        }
    }, function () {
        if (window.matchMedia("(min-width: 769px)").matches) {
            if (pinned === 1) {
                $('.page-wrapper').addClass('pinned')
                pinned = 0
                let elementsActive = $(this).find('.active')
                elementsActive.each(function () {
                    $(this).removeClass('active')
                    $(this).children().children('.menu-dropdown').css('transform', 'rotate(0)')
                })
                let allSubmenu = $(this).find('.sidebar-submenu')
                allSubmenu.each(function () {
                    $(this).slideUp(200);
                })
            }
        }
    })
    
    $('#pin-sidebar').click(function() {
        $('.sidebar-dropdown').each(function () {
            $(this).removeClass('active')
        })
        $('.sidebar-submenu').each(function () {
            $(this).slideUp(200)
        })
        $('.sidebar-dropdown .menu-dropdown').each(function () {
            $(this).css('transform', 'rotate(0)')
        })
        if ($('.page-wrapper').hasClass('pinned')) {
            $('.page-wrapper').removeClass('pinned');
            if (window.matchMedia("(min-width: 769px)").matches) {
                $('.page-wrapper .page-content').css({'margin-left':'230px'})
                $('.page-wrapper .main-footer').css({'margin-left':'230px'})
                checkOpenSidebar()
            }
        } else {
            $('.page-wrapper').addClass('pinned');
            if (window.matchMedia("(max-width: 769px)").matches) {
                checkOpenSidebar()
            }
        }
    });

});