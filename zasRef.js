$(function(){
	let selectedDiv = $("#imageFace")
	selectedDiv.addClass('dotted-border')

	$("#menu_1").click(function () {
		$("#glass_menu").show()
		$('#beard_menu').hide()
		$('#hats_menu').hide()
	})

	$(".accessories").draggable()

	$("#imageFace").droppable(
		{
			drop:function(event,ui){
				var draggedAccessoryId = ui.draggable.attr('id');
				selectedDiv.removeClass('dotted-border')
				selectedDiv = $(`#${draggedAccessoryId}`)
				$("#imageFace").removeClass('dotted-border')
				selectedDiv.addClass('dotted-border')
			}
		}
	)

	$("#imageFace").click(function () {
		selectedDiv.removeClass('dotted-border')
		$("#imageFace").addClass('dotted-border')
	})


	$("#plus").click(function () {

	})

	$("#minus").click(function () {
		
	})


	$("#")
})