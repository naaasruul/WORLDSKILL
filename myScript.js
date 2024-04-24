$(function(){
	
	let selectedDiv = $('#imageFace'); //default dotted border goes to image
	selectedDiv.addClass('dotted-border');
 
	$('#glasses_menu').show();
	$('#beards_menu').hide();
	$('#hats_menu').hide();

	$("#menu_1").click(function(){
		$('#glasses_menu').show();
		$('#beards_menu').hide();
		$('#hats_menu').hide();
	});
	
	$("#menu_2").click(function(){
		$('#glasses_menu').hide();
		$('#beards_menu').show();
		$('#hats_menu').hide();
	});
	
	$("#menu_3").click(function(){
		$('#glasses_menu').hide();
		$('#beards_menu').hide();
		$('#hats_menu').show();
	});

	// TO Activate drag functions
	$('.accessories').draggable(
		// use revert
			{
				revert:function(dropped){
					if(!dropped){
						return true;
					}
					else{
						return false;
					}
				}
			}
	);
	
	// TO Activate where to drop functions
	$("#imageFace").droppable(
		{
			// When an element is dropped onto the droppable area...
			drop: function( event, ui ) {

				var draggedAccessoryId = ui.draggable.attr('id')
				
				var accessoryId = draggedAccessoryId.split("_") // [hat,1]
				
				if(!accessoryId[0].startsWith("clone")){
					
					var accessory =  `#clone_${accessoryId[0]}`
					console.log(accessory)

					// mun dalam tok ada item dengan id yang dinyatakan. buang nya.
					// cik wan nya padah,
					// contoh clone_glass dah wujud ke belum, kalau dah buang kn dia
					if($(accessory) != null){
						$(accessory).remove()
					}
					// Clone the dragged element
					var clonedAccessory = ui.draggable.clone();
					clonedAccessory.draggable()
					clonedAccessory.addClass('accessories')
					clonedAccessory.attr('id',`clone_${accessoryId[0]}`)
					// Append the cloned element to the droppable area
					$(this).append(clonedAccessory);
					
					selectedDiv.removeClass('dotted-border')
					selectedDiv = clonedAccessory
					selectedDiv.addClass('dotted-border')
					// saya hanya akan mula benda baru jika dia tak bermula dengan "cloned"
					
					// Revert back the dragged img
					ui.draggable.draggable('option','revert',true)

				}
				else{
					selectedDiv.removeClass('dotted-border')
					selectedDiv = $(`#${ui.draggable.attr('id')}`);
					selectedDiv.addClass('dotted-border')
				}
			}
		}
	);
	
	

	$("#imageFace").click(function(){
		selectedDiv.removeClass(`dotted-border`)
		selectedDiv = $("#imageFace")
		selectedDiv.addClass('dotted-border')
	})

	$("#plus").click(function(){
		increaseSelected()
	})

	$("#minus").click(function(){
		decreasedSelected()
	})
	
	function decreasedSelected(){
		var currentWidth = selectedDiv.width();
		var currentHeight = selectedDiv.height();
		selectedDiv.height(currentHeight *0.9)
		selectedDiv.width(currentWidth *0.9)
	}
	function increaseSelected(){
		var currentWidth = selectedDiv.width();
		var currentHeight = selectedDiv.height();
		selectedDiv.height(currentHeight *1.1)
		selectedDiv.width(currentWidth *1.1)
	}

	$(document).keydown(function(e){
		if(e.which == 187 || e.keycode == 187){
			increaseSelected()
		}
		else if(e.which == 189 || e.keycode == 189){
			decreasedSelected()
		}
	})
});


