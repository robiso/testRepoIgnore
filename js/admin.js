$(function() {
    // Fix for admin settings corectly removing the active class in the menu
    $(".nav-tabs li.nav-item a.nav-link").click(function() {
        $(".nav-tabs li.nav-item a.nav-link").removeClass('active');
    });

    var editElements = {};
    $('.editable').summernote({
        airMode: false,
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['fontsize', 'color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link','image', 'doc', 'picture', 'video']], // image and doc are customized buttons
            ['table', ['table']],
            ['misc', ['codeview']],
        ],
        placeholder: 'Click here to enter content.',
        callbacks: {
            onChange: function(contents, $editable) {
                editElements[$(this).attr('id')] = contents;
            },
            onBlur: function() {
                if (editElements[$(this).attr('id')]!=undefined) {
                    // Confirmation popup for saving changes (set in the database)
                    if (typeof saveChangesPopup !== 'undefined' && saveChangesPopup && !confirm('Save new changes?')) {
                        alert("Changed are not saved, you can continue to edit or refresh the page.");
                        return
                    }

                    var id = $(this).attr('id');
                    var content = editElements[$(this).attr('id')];
                    var target = ($(this).attr('data-target')!=undefined) ? $(this).attr('data-target'):'pages';
                    editElements[$(this).attr('id')] = undefined;
                    $.post("",{
                        fieldname: id,
                        content: content,
                        target: target,
                        token: token,
                    })
                    .done(function() {
                        $("#save").show();
                        $('#save').delay(100).fadeOut(); 
                    });
                }
            }
        },
    });
});
