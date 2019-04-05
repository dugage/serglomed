var PagesActions = {

    Start: function(){
        $("#modalArgumentario").hide();
        $(".menu-toggler").addClass('fold');
        foldMenu();
        let viweRegsiterEmail = $("#VIEW-REGISTROS input[name='email']").val();
        if(viweRegsiterEmail != '')
            $("#VIEW-REGISTROS .send-template").show();

    },

    SendForm : function(){
        
        $(".send-form").click(function(){

            var alias = $(this).attr("id");
            $( 'form[name="form-'+alias+'"]' ).submit();

         });
    },

    OpenFileW: function(){

        $( ".open-file" ).click(function() {

            var cdm = $(this).attr('cmd');
            $('input[name="'+cdm+'"]').trigger('click');

        });

        $('input[type="file"]').change(function(){

            var cdm = $(this).attr('cmd');
            $( 'form[name="form-'+cdm+'"]' ).submit();

        });

    },

    CheckAction: function() {

        $( ".md-check" ).click(function() {

            var multi = $(this).attr('multi');
            var field = $(this).attr('field');
            var table = $(this).attr('table');
            var id = $(this).attr('key');
            var vl = 0;

            if(multi == 'false'){

                if(field == 'estado' && table == 'usuarios')
                {
                  if($(this).is(":checked")){

                    vl = $(this).val();

                  }else{

                    vl = 1;
                  }

                }else
                {
                  if($(this).is(":checked")){vl = 1;}
                }


            }else{

                vl = "";
                $('input[name="'+field+'[]"]:checked').each(function() {
                    vl += $(this).val() + ",";
                });
                //eliminamos la última coma.
                vl = vl.substring(0, vl.length-1);
            }

            var type = 'POST';
            var url = site_url+'/ajax_actions/update_ajax';
           var data = {'field':field,'table':table,'vl':vl,'id':id,'lang':lang};
            ActionAjax(type,url,data,null,null,false,false);

        });

    },

    SelectAction: function(){

        $( ".md-select" ).change(function() {

            var field = $(this).attr('field');
            var table = $(this).attr('table');
            var id = $(this).attr('key');
            var vl = $(this).val();

            var type = 'POST';
            var url = site_url+'/ajax_actions/update_ajax';
            var data = {'field':field,'table':table,'vl':vl,'id':id,'lang':lang,'nodoctrine':1};
            ActionAjax(type,url,data,null,null,false,false);

        });
    },

    BtnBoolean: function(){

        $( ".md-boolean" ).click(function() {

            var id = $(this).data("id");
            var vl = $(this).data("value");
            var entity = $(this).data("entity");
            var field = $(this).data("field");
            var radio = $(this).data("radio");

            var type = 'POST';
            var url = site_url+'/ajax_actions/boolean_ajax';
            var data = {'entity':entity,'vl':vl,'id':id,'field':field};
            ActionAjax(type,url,data,null,null,false,false);

            if(radio == 'false'){

                if(vl == 1){

                $(this).data("value", "0");
                $(this).text("Bloqueado");
                $(this).removeClass("green");
                $(this).addClass("red");

                }else if(vl == 0){

                    $(this).data("value", "1");
                    $(this).text("Desbloqueado");
                    $(this).removeClass( "red" );
                    $(this).addClass("green");
                }
            } 

        });
    },

    TextAction: function(){

        $(".md-text").keyup(function() {

            var field = $(this).attr('field');
            var table = $(this).attr('table');
            var id = $(this).attr('key');
            var vl = $(this).val();

            action = setTimeout(function(){

                var type = 'POST';
                var url = site_url+'/ajax_actions/update_ajax';
                var data = {'field':field,'table':table,'vl':vl,'id':id,'lang':lang};
                ActionAjax(type,url,data,null,null,false,false);

            }, 300);

        });
    },

    ShootForm: function(){

        $( ".md-shoot-form" ).change(function() {

            $( "#shoot" ).submit();

        });
    },

    CheckRequired : function(){
        
        $(".checkRequired").click(function(e){

            var alias = $(this).attr("id");
            var check = true;

            $("."+alias+"Required").each(function(){

                if($(this).val() === ""){

                    $(this).css('border','1px solid red');
                    check = false;

                }else{

                    $(this).css('border','1px solid #c2cad8');
                }
                
            });

            if(!check){
               
                return false;
            }

         });
    },

    //// These isn't generics actions
    UpdateProductAttribute: function(){

        $(".impact-attribute").click(function() {

            var id = $(this).attr('id');
            var id_product = $("#attribute-value-"+id).attr('key');
            var id_attribute = $("#attribute-value-"+id).attr('attribute');
            var id_attribute_value = $("#attribute-value-"+id).attr('attribute_value');
            var impact = $("#attribute-value-"+id).val();

            var type = 'POST';
            var url = site_url+'/productos/update_product_attribute';
            var data = {'id_product':id_product,'id_attribute':id_attribute,'id_attribute_value':id_attribute_value,'impact':impact};
            ActionAjax(type,url,data,null,null,false,false);

        });
    },

    GeneratePass : function(){

        $('.get-pass').click(function(){

            var type = 'POST';
            var url = site_url+'/usuarios/generate_pass';
            var data = {};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            result = JSON.parse(returndata);

            $('.pass').val(result);

        });

    },

    GetNumRecords : function(){

        $('.usuarioReg').change(function(){

            var id = $('.usuarioReg').val();
            var provincia = $('.provincia').val();
            var poblacion = $('.poblacion').val();
            var cp = $('.cp').val();
            var vencimiento = $('.renovation').val();
            var prima = $('.prima').val();
            var estado = $('.estadoReg').val();
            var typeCon = $('#typeCon:checked').val();

            var type = 'POST';
            var url = site_url+'/registros/get_num_records';
            var data = {'id':id,'provincia':provincia,'poblacion':poblacion,'estado':estado,'cp':cp, 'vencimiento': vencimiento,'prima': prima, 'typeCon':typeCon};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            result = JSON.parse(returndata);

            $('.note').html('<span class="label label-danger">NOTA!</span> El usuario seleccionado tiene '+result.numRegistros+' registros.');

        });

    },

    Chronometre : function(){

        var timeC = {
            hora: 0,
            minuto: 0,
            segundo: 0
        };

        var chronometre = null;

        $('#btn-chronometre').click(function(){

            if ($(this).hasClass('start')){

                var user= $(this).data("user");
                var record = $(this).data("record");

                var type = 'POST';
                var url = site_url+'/registros/add_record';
                var data = {'user':user,'record':record};

                var returndata = ActionAjax(type,url,data,null,null,true,false);
                result = JSON.parse(returndata);

                $(this).attr("data-recorcall",result.id);

                $(this).html('<i class=" icon-call-end "></i> Finalizar llamada');
                $(this).removeClass( "start").addClass( "end");
                $(this).removeClass( "grey-mint").addClass( "red");

                chronometre = setInterval(function(){

                    timeC.segundo++;
                    if(timeC.segundo >= 60)
                    {
                        timeC.segundo = 0;
                        timeC.minuto++;
                    }

                    if(timeC.minuto >= 60)
                    {
                        timeC.minuto = 0;
                        timeC.hora++;
                    }

                    $("#hours").text(timeC.hora < 10 ? '0' + timeC.hora : timeC.hora);
                    $("#minutes").text(timeC.minuto < 10 ? '0' + timeC.minuto : timeC.minuto);
                    $("#seconds").text(timeC.segundo < 10 ? '0' + timeC.segundo : timeC.segundo);

                }, 1000);

            }else if($(this).hasClass('end')){

                $(this).html('<i class=" icon-call-end "></i> Comenzar llamada');
                $(this).removeClass( "end").addClass( "start");
                $(this).removeClass( "red").addClass( "grey-mint");

                var recorcall = $(this).data("recorcall");
                var record = $(this).data("record");

                clearInterval(chronometre);
                $('#registrosllamadasModal').modal('show');
                $("#formendcall").attr("action",site_url+"/registros/edit_record/"+record+"/"+recorcall)
            }

        });

    },

    HideShow : function(){

        $('#estados').change(function(){

            var estado = $(this).val();
            var id = $(this).data('id');

            if(estado == 1 || estado == 2 || estado == 3){

                $('#date-hour').show();

            }else{

                $('#date-hour').hide();
            }

            if( estado == 7 ) {
                $('#reason').show();
            }else{
                $('#reason').hide();
            }

            if(estado == 8)
            {
                var type = 'POST';
                var url = site_url+'/registros/checkRequiredRegister';
                var data = {'id':id};
                //comprobamos si los campos obligatorios estan rellenos y devolvemos true/false
                var returndata = ActionAjax(type,url,data,null,null,true,false);
                //si la respuesta es true mostramos el modal event, en caso contrario, mostramos el alert
                //e informamos al usuario
                if(returndata == "true"){

                    $('#addEvent').show();

                }else if(returndata == "false"){

                    alert("Los campos CIF, Código postal, Dirección, Persona de contacto, Operador, Nº de líneas y teléfono son obligatorios para realizar una Cita positiva. Además, recuerda que es obligatorio realizar la validación del CIF haciendo click en el botón con el check.");
                    window.location=site_url+"/registros/view/"+id;
                }


            }else{

                $('#addEvent').hide();
                
            }

        });

        $('.estadoReg').change(function(){

            var estado = $(this).val();

            if(estado > 0){

                $('.actionestadoReg').show();

            }else{

                $('.actionestadoReg').hide();
            }

        });

        $('.btn-searcher').click(function(){

            if($('.dropdown-notification').hasClass('open')){

                $('.actionestadoReg').hide();
                $('.dropdown-notification').removeClass( "open" );

            }else{

                $('.actionestadoReg').show();
                $('.dropdown-notification').addClass( "open" );
            }

        });

        $('.estadoSeguimiento').change(function(){

            var estado = $(this).val();

            if(estado == 'Cierre'){

                $('.agendarSiNo').show();

            }else if(estado == 'Ko'){

                $('.content-agendar').hide();
                $('.agendarKO').show();


            }else{

                $('.agendarSiNo').hide();
                $('.content-agendar').show();
                $('.agendarKO').hide();
            }


        });

        $('.boSelect').change(function(){

            var estado = $(this).val();
            var alias = $(this).attr('id');

            if(estado == 1){

                $('.boShHi-'+alias).show();

            }else{

                $('.boShHi-'+alias).hide();
            }

        });

        
    },

    SubmenuAction : function(){

        $('.lisub').click(function(){

            var id = $(this).data("id");

            if($(this).hasClass('open')){

                $('.sub-menu'+id).hide();
                $('.arrow'+id).removeClass( "open" );
                $(this).removeClass( "open" );

            }else{

                $('.sub-menu'+id).show();
                $('.arrow'+id).addClass( "open" );
                $(this).addClass( "open" );
            }


        });
    },

    Pagination : function(){

        $('.btn-pagination').click(function(){

            var start = $(this).attr("start");
            var max = $(this).attr("max");
            var entity = $(this).attr("entity");

            if ($(this).hasClass('bnt-previous')){

                if(start > 0){

                    $(this).attr("start",parseInt(start) - parseInt(max));
                    $('.bnt-next').attr("start", start);

                }

            }else if($(this).hasClass('bnt-next')){
                
                $(this).attr("start", parseInt(start) + parseInt(max));

                if(start > max){

                    $('.bnt-previous').attr("start", start);
                }
                
            }

            $('#listado-cuentas').html('<p style="width: 100%; float: left; text-align: center;"><img src="'+base_url+'assets/apps/img/ajax-loader.gif"/></p>');

            var type = 'POST';
            var url = site_url+'/oportunidades/pagination';
            var data = {'start':start,'max':max,'entity':entity};

            var returndata = ActionAjax(type,url,data,null,null,true,false);

            $('#listado-cuentas').html(returndata);

        });
    },

    Search : function(){

        $('.btn-search').click(function(){

            var q = $('input[type="text"]#q').val();
            var param = $('select#param').val();
            var entity = $(this).attr("entity");

            
            $('#listado-cuentas').html('<p style="width: 100%; float: left; text-align: center;"><img src="'+base_url+'assets/apps/img/ajax-loader.gif"/></p>');

            var type = 'POST';
            var url = site_url+'/oportunidades/search';
            var data = {'q':q,'param':param,'entity':entity};

            var returndata = ActionAjax(type,url,data,null,null,true,false);

            $('#listado-cuentas').html(returndata);

        });
    },

    SelectAccount : function(){

        $("#listado-cuentas").on("click",".select-account", function(){

            var id = $(this).attr('id');

            var type = 'POST';
            var url = site_url+'/oportunidades/select_account';
            var data = {'id':id};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            result = JSON.parse(returndata);
            
            $('input[name="cuenta"]').val(result.nombre);
            $('input[name="idcuenta"]').val(result.id);
            
            $('.search-modal').modal('hide');

        });

    },

    Report : function(){

        $("#gen-info-per").click(function(){

            var reportType = $("#tipoinforme").val();
            var rol = $("#rolReport").val();
            var user = $("#userReport").val();
            var from = $("#from-report").val();
            var to = $("#to-report").val();

            $('#report-table').html('<p style="width: 100%; float: left; text-align: center;"><img src="'+base_url+'assets/apps/img/ajax-loader.gif"/></p>');

            var type = 'POST';
            var url = site_url+'/informes/createReport';
            var data = {'reportType':reportType,'user':user,'from':from,'to':to,'rol':rol};

            var returndata = ActionAjax(type,url,data,null,null,true,false);

            $('#report-table').html(returndata);

            $('#reportFrom').val(from);
            $('#reportTo').val(to);
            $('#reportTipo').val(reportType);
            $('#reportRol').val(rol);
            $('#reportUser').val(user);

        });

        $("#standart-report").click(function(){

            var reportType = $(this).data('tipoinforme');
            var opr = 0;
            var reportDate = 1;

            $('#report-table').html('<p style="width: 100%; float: left; text-align: center;"><img src="'+base_url+'assets/apps/img/ajax-loader.gif"/></p>');

            var type = 'POST';
            var url = site_url+'/informes/createReport';
            var data = {'reportType':reportType,'opr':opr,'reportDate':reportDate,'standart':'true'};

            var returndata = ActionAjax(type,url,data,null,null,true,false);

            $('#report-table').html(returndata);
            

        });

        $("#gen-info-per__").click(function(){

            var reportType = $("#tipoinforme").val();
            var opr = $("#operador").val();
            var reportDate = 1;

            window.location=site_url+"/informes/createReport?rt="+reportType+"&opr="+opr;
            

        });

        $("#rolReport").change(function(){

            var rol = $(this).val();

            var type = 'POST';
            var url = site_url+'/informes/getUser';
            var data = {'rol':rol};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            
            $('#userReport').html(returndata);

        });

    },

    MenuToggler : function(){
        
        $(".menu-toggler").click(function(){

            if ($(this).hasClass('fold')){

                $(this).removeClass('fold');
                unfoldMenu();
                
            }else{
                
                $(this).addClass('fold');
                foldMenu();

            }


         });
    },

    AddSeguimientoEstado : function(){
        
        $(".add-se-es").change(function(){

            if ($(this).val() == 'KO'){

                id = $(this).data('id');
                location.href = site_url+"/tareas/ko/"+id;
                
            }else{
                
                $('#AddSeEsModal').modal('show');
                $('input[name="tipo-seguimiento"]').val($(this).val());
            }


         });

        $(".select-cierre").change(function(){

            id = $(this).data('tarea');

            if ($(this).val() == 'Volver a llamar'){

                $('#volverLlamarModal').modal('show');
                $('input[name="tipo-seguimiento"]').val($(this).val());
                
            }else{
                
                $('#AddSeEsModal').modal('show');
                $('input[name="tipo-seguimiento"]').val($(this).val());
                $('#AddSeEsModal form').attr('action',site_url+'/tareas/gestionaCierre/'+id);
            }


         });

    },

    GestionKO : function(){
        
        $(".gestion-ko").click(function(){

            $(".btn-go-ko").show();
            var gestionKo = $("input[name='gestion-ko']:checked");

            if(gestionKo.val() == 'Deuda' || gestionKo.val() == 'Permanencia' || gestionKo.val() == 'Penalización'){

                $(".months-ko").show();

            }else{

                $(".months-ko").hide();

            }


        });

        $('.go-ko').click(function(){

            var gestionKo = $("input[name='gestion-ko']:checked");
            var goBackTo = $('#goBackTo').val();
            
            if(gestionKo.val() == 'Deuda' || gestionKo.val() == 'Permanencia' || gestionKo.val() == 'Penalización'){

                var selectMonthsKo = $(".select-months-ko");

                var ko = 'default';
                var id = selectMonthsKo.data('key');
                var select = selectMonthsKo.val();
                var radio = gestionKo.val();
                var data = {'ko':ko,'select':select,'radio':radio};

            }else{

                var ko = gestionKo.val();
                var id = gestionKo.data('key');
                var data = {'ko':ko};
                
            }

            var type = 'POST';
            var url = site_url+"/maincontroller/ko/"+id;
        
            ActionAjax(type,url,data,null,null,false,false);

             setInterval(function(){ 
                window.location.href = site_url+"/"+goBackTo; 
            }, 3000);
            

         });   

       /* $(".select-months-ko").change(function(){

            var ko = 'default';
            var id = $(this).data('key');
            var select = $(this).val();
            var radio = $('.gestion-ko:checked').val();

            var type = 'POST';
            var url = site_url+"/tareas/ko/"+id;
            var data = {'ko':ko,'select':select,'radio':radio};
        
            ActionAjax(type,url,data,null,null,false,false);

        });*/
    },

    VerificaTarea : function(){

        $(".verifica-tarea").change(function(){
            
            if($(this).val() == 1){

                var tarea = $(this).data('tarea');
                var seguimiento = $(this).data('seguimiento');
                
                var type = 'POST';
                var url = site_url+'/tareas/verifica_tarea';
                var data = {'tarea':tarea,'seguimiento':seguimiento};

                ActionAjax(type,url,data,null,null,false,false);
                
                $(this).prop('disabled', 'disabled');

                setInterval(function(){ 
                    window.location.href = site_url+"/tareas"; 
                }, 3000);

            }
            

         });

    },

    DrawModal: function(){

        $( ".drawModal" ).click(function() {

            var path = $(this).data('path');
            var title = $(this).data('title');

            var type = 'POST';
            var url = site_url+'/'+path;
            var data = {'path':path};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            $('#MainModal form').attr('action',site_url+'/'+path);
            $('#MainModal h4.modal-title').text(title);
            $('#MainModal .modal-body form').prepend(returndata);

        });
    },

    GetArgumentario: function(){

        $('body').on('click', '.argumentario', function(){
            $('#modalArgumentario').show();
            var id = $(this).attr('id');
            var campaign = $(this).data( "campaign" );

            var type = 'POST';
            var url = site_url+'/argumentario/getArgumentario';
            var data = {'id':id,'campaign':campaign};

            var returndata = ActionAjax(type,url,data,null,null,true,false);
            result = JSON.parse(returndata);

            //$('#modalArgumentario h4.modal-title').text(result.title);
            //$('#modalArgumentario .modal-body').html(result.body);
            //console.log(result.title);
            $('#argumentarioTitle h4').text(result.title);
            $('#argumentarioBody').html(result.body);

        });
    },
    //para las acciones de los btn de tipo soft_delete
    SoftDelete: function(){
        
        $('body').on('click', '.delete-soft', function(e){
            //almacenamos el confirm en una variable
            var conf = confirm('Esta acción eliminará los registros que quedaron sin asignar y los que se codificaron como no interesados ¿Quieres continuar?');
            //alamcenamos la url donde tendrá que iren casi de que el susario despues del aler quiere continuar
            var uri = $(this).data( "uri" );
            if( conf ) {
                //redirigimos
                location.href=uri;
            }

        });
    },
    /**
     * Método que envía un email con información comercial
     * seleccionando un template de la entidad Templates
     */
    SendInfo: function(){

        $('body').on('click', '.send-info-template', function(e){
            //obtenemos el template seleccionado
            let template = $('.info-templates').val();
            //comprobamos si se selecciono o no una opción
            if( template == 0 ){
                $('#modalSendInfo .alert-danger').show();
            }else{
                $('#modalSendInfo .alert-danger').hide();
                //mostramos el msm de enviando.
                $('#modalSendInfo .alert-info').html('<i class="fa fa-clock-o" aria-hidden="true"></i> Enviando información...');
                $('#modalSendInfo .alert-info').show();
                //realizamos un post mediante ajax
                let type = 'POST';
                let url = site_url+'/plantillas/sendTemplate';
                let data = {'template':template};
                //obtenemos lo retornado, que en este caso puede ser un
                //mensage positivo o negativo para informar al teleoperador.
                var returndata = ActionAjax(type,url,data,null,null,true,false);
                result = JSON.parse(returndata);
                
                if( result.result ){

                    $('#modalSendInfo .alert-success').text('La información ha sido enviada con éxito');
                    $('#modalSendInfo .alert-info').hide();
                    $('#modalSendInfo .alert-success').show();

                }else{

                    $('#modalSendInfo .alert-danger').html('<strong>Ups</strong> Hemos tenido un problema y la información no ha podido ser enviada.');
                    $('#modalSendInfo .').hide();
                    $('#modalSendInfo .alert-danger').show();
                }
                
                console.log(result.msm);
            }
            

        });
    },
}
function foldMenu(){

    $(".page-sidebar-wrapper ul li a span").hide();
    $(".page-sidebar-wrapper .navbar-collapse").css('width','4%');
    $(".page-content-wrapper .page-content").css('margin-left','60px');
    $(".sub-menu.sub-menu2 li a").css('padding-left','17px');
    
}

function unfoldMenu(){

    $(".page-sidebar-wrapper ul li a span").show();
    $(".page-sidebar-wrapper .navbar-collapse").css('width','235px');
    $(".page-content-wrapper .page-content").css('margin-left','235px');
    $(".sub-menu.sub-menu2 li a").css('padding-left','30px');
}

$(window).load(PagesActions.Start);
$(window).load(PagesActions.OpenFileW);
$(window).load(PagesActions.CheckAction);
$(window).load(PagesActions.SelectAction);
$(window).load(PagesActions.BtnBoolean);
$(window).load(PagesActions.TextAction);
$(window).load(PagesActions.ShootForm);
$(window).load(PagesActions.UpdateProductAttribute);
$(window).load(PagesActions.GeneratePass);
$(window).load(PagesActions.GetNumRecords);
$(window).load(PagesActions.Chronometre);
$(window).load(PagesActions.HideShow);
$(window).load(PagesActions.SubmenuAction);
$(window).load(PagesActions.Pagination);
$(window).load(PagesActions.Search);
$(window).load(PagesActions.SelectAccount);
$(window).load(PagesActions.Report);
$(window).load(PagesActions.MenuToggler);
$(window).load(PagesActions.AddSeguimientoEstado);
$(window).load(PagesActions.SendForm);
$(window).load(PagesActions.VerificaTarea);
$(window).load(PagesActions.GestionKO);
$(window).load(PagesActions.DrawModal);
$(window).load(PagesActions.CheckRequired);
$(window).load(PagesActions.GetArgumentario);
$(window).load(PagesActions.SoftDelete);
$(window).load(PagesActions.SendInfo);
