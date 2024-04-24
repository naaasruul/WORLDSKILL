$(function () {
  let selectedDiv = $("#imageFace"); //default dotted border goes to image
  selectedDiv.addClass("dotted-border");

  $("#glasses_menu").show();
  $("#beards_menu").hide();
  $("#hats_menu").hide();

  $("#menu_1").click(function () {
    $("#glasses_menu").show();
    $("#beards_menu").hide();
    $("#hats_menu").hide();
  });

  $("#menu_2").click(function () {
    $("#glasses_menu").hide();
    $("#beards_menu").show();
    $("#hats_menu").hide();
  });

  $("#menu_3").click(function () {
    $("#glasses_menu").hide();
    $("#beards_menu").hide();
    $("#hats_menu").show();
  });


  // drag and drop image

  // drag dan lalu
  $("#dropArea").on('dragover',function(e){
    e.preventDefault()
    $("#dropArea").addClass('grey-background')
  })
  
  // drag dan lalu dan tinggalkan
  $("#dropArea").on('dragleave',function(e){
    e.preventDefault()
    $("#dropArea").removeClass('grey-background')
    
  })
  
  // drag dan lalu dan tinggalkan
  $("#dropArea").on('drop',function(e){
    e.preventDefault()
    $("#dropArea").removeClass('grey-background')
    
    // untuk dapatkan file
    const file = e.originalEvent.dataTransfer.files[0]
    handleFile(file);
  })


  // this is where you learn HOW TO READ DRAGGED FILES
  // -------------------------------------------------------------------------------------
  function handleFile(file){
    // mun nya jpeg and size nya kurang 3MB
    if(file && file.type === 'image/jpeg' && file.size <= 300 * 1024  ){
      // 
      $("#loadingBar").fadeOut()
      
      // initailize
      const reader = new FileReader();

      reader.onload = function (event){
        const imgSrc = event.target.result; // dapatkan maklumat

        // pastu tukar bg img
        $("#imageFace").css('background-image',`url(${imgSrc})`)
        selectedDiv.removeClass('dotted-border')
        selectedDiv = $('#imageFace')
        selectedDiv.addClass('dotted-border')
      }

      // benda baru kena hafal ni je ^^

      // baca fail dari url dan jadikan ia data 
      reader.readAsDataURL(file);
    }else{
      alert("file doesnt match requirement. JPEG file must be less than 300KB")
    }
    // masukkan nya ke dalam #imageFace
    // kita tukar background-url kepada dragged file
    // kalau tak keluarkan alert yang kau tak layak (doesnt match requirement)
  }

  // ------------------------------------------------------------------------------------------------
  // CANVAS pun ada foormula
  // 1.canvas is just a one paper that u can draw on it



  // TO Activate drag functions
  $(".accessories").draggable(
    // use revert
    {
      revert: function (dropped) {
        if (!dropped) {
          return true;
        } else {
          return false;
        }
      },
    }
  );

  // TO Activate where to drop functions
  $("#imageFace").droppable({
    // When an element is dropped onto the droppable area...
    drop: function (event, ui) {
      var draggedAccessoryId = ui.draggable.attr("id");

      var accessoryId = draggedAccessoryId.split("_"); // [hat,1]

      if (!accessoryId[0].startsWith("clone")) {
        var accessory = `#clone_${accessoryId[0]}`;
        console.log(accessory);

        // mun dalam tok ada item dengan id yang dinyatakan. buang nya.
        // cik wan nya padah,
        // contoh clone_glass dah wujud ke belum, kalau dah buang kn dia
        if ($(accessory) != null) {
          $(accessory).remove();
        }
        // Clone the dragged element
        var clonedAccessory = ui.draggable.clone();

        clonedAccessory.draggable();

        // ui.offset.left merujuk kepada X & Y untuk draggable
        // $(this).offset.left & $(this).offset.top merujuk kpd untuk #imageFace
        // Formula ui.offset.left - $(this).offset.left akan bago positioon accesory didalam imageface
        var offsetX = ui.offset.left - $(this).offset.left;
        var offsetY = ui.offset.top - $(this).offset.top;

        clonedAccessory.css({ top: offsetY, left: offsetX });

        clonedAccessory.addClass("accessories");
        clonedAccessory.attr("id", `clone_${accessoryId[0]}`);
        // Append the cloned element to the droppable area
        $(this).append(clonedAccessory);

        selectedDiv.removeClass("dotted-border");
        selectedDiv = clonedAccessory;
        selectedDiv.addClass("dotted-border");
        // saya hanya akan mula benda baru jika dia tak bermula dengan "cloned"

        // Revert back the dragged img
        ui.draggable.draggable("option", "revert", true);
      } else {
        selectedDiv.removeClass("dotted-border");
        selectedDiv = $(`#${ui.draggable.attr("id")}`);
        selectedDiv.addClass("dotted-border");
      }
    },
  });

  $("#imageFace").click(function () {
    selectedDiv.removeClass(`dotted-border`);
    selectedDiv = $("#imageFace");
    selectedDiv.addClass("dotted-border");
  });

  $("#plus").click(function () {
    increaseSelected();
  });

  $("#minus").click(function () {
    decreasedSelected();
  });

  function decreasedSelected() {
    var currentWidth = selectedDiv.width();
    var currentHeight = selectedDiv.height();
    selectedDiv.height(currentHeight * 0.9);
    selectedDiv.width(currentWidth * 0.9);
  }
  function increaseSelected() {
    var currentWidth = selectedDiv.width();
    var currentHeight = selectedDiv.height();
    selectedDiv.height(currentHeight * 1.1);
    selectedDiv.width(currentWidth * 1.1);
  }

  $(document).keydown(function (e) {
    if (e.which == 187 || e.keycode == 187) {
      increaseSelected();
    } else if (e.which == 189 || e.keycode == 189) {
      decreasedSelected();
    }
  });


  $("#save").click(function(){
    console.log("save pressedd")
    // bina canvas
    var canvas = document.createElement('canvas');  
    var ctx = canvas.getContext("2d");

    // set width and height canvas so sama dengan width & heigth #imageFace
    // width dengan height belah kiri is property, kalau belah kanan kita nak dapat value width() and height() tersebut
    canvas.width = $("#imageFace").width()
    canvas.height = $("#imageFace").height()

    // dapatkan bg URL dari #imageFace
    var backgroundImage = $("#imageFace").css('background-image')
    console.log(backgroundImage.split(`"`)[1])
    var imgURL = backgroundImage.split(`"`)[1] //retrieve img URL

    // bina image di dalam canvas
    var bgImage = new Image()

    // bila image habis dilukis, masukkan dalam canvas
    bgImage.onload = function(){
      // lukiskan img tersebut didalam canvas
      // from x=0,y=0,width & height sebesar canvas
      ctx.drawImage(bgImage,0,0,canvas.width,canvas.height)

      // go through each img in #imageFace and draw it on canvas
      var images = $("#imageFace").find('img') //use find()
      console.log(images)

      
      images.each(function(){
        var image = this;
        var imagePosition = $(image).position()
        var imageWidth = $(image).width()
        var imageHeight = $(image).height()
        
        ctx.drawImage(image, imagePosition.left, imageWidth.top, imageWidth, imageHeight)
      })


      // to download the picture after clicked save
      var dataURL = canvas.toDataURL('image/png')

           var link = document.createElement('a')
           link.download = 'image.png'
           link.href = dataURL;

           link.click();


      // to check all is ok
      document.body.appendChild(canvas)
      
    }
    bgImage.src = imgURL  ;
    



  })
});
