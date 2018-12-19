var Calendar = {

    Start: function() {

        AddClassDays();

        if($('input[name="comercial"]').length)
        {
            var id = $('input[name="comercial"]').attr('id');
            addEventCalendar(date = $('.calendar').attr('id'),userlist = id); 
        }
        

     },

    NextPrev: function() {

        $('body').on('click', '.heading_row_start a', function(e){

            e.preventDefault();

            $( '.calendar' ).css( "opacity", "0.3" );
            $( '#content-calendar' ).append('<p style="position:absolute; top:50%; width: 100%; float: left; text-align: center;"><img src="'+base_url+'assets/apps/img/ajax-loader.gif"/></p>');

            var uri = $(this).attr('href');
            var date = uri.split("/");
            date = date[7]+'-'+date[8];
            var id = false;

            var type = 'POST';
            var url = uri;
            var data = {};

            var returndata = ActionAjax(type,url,data,null,null,true,false);

            $('#content-calendar').html(returndata);
            AddClassDays();

            if($('input[name="comercial"]').length)
            {
                id = $('input[name="comercial"]').attr('id');
            }
            
            addEventCalendar(date,id);
            
    	});

    },

    CheckboxUser: function(){

        $('.users').click(function(){

            var date = $('.calendar').attr('id');
            addEventCalendar(date);

        });

     },

     ShowEventsList: function(){

        $('body').on('click', '.btn-event', function(){


            var id = $(this).attr('id');
            var date = $('.calendar').attr('id');
            var day = $(this).data('day');

            var type = 'POST';
            var url = site_url+'/calendario/get_events_list';
            var data = {'id':id,'date':date,'day':day};

            var eventsL = ActionAjax(type,url,data,null,null,true,false);
            eventsL = JSON.parse(eventsL);

            $('.modal-title').text('Listado de eventos '+eventsL[0].idusuario.nombre+' '+eventsL[0].idusuario.apellidos);
            getTableEvent(eventsL,date,day);
            $('#table-calendar').show();
            $('#form-edit').hide();
            $('#eventoslistModal').modal('show');
            

        });

     },

     ShowEventsDetail: function(){

        $('body').on('click', '.btn-event', function(){

            if ($(this).hasClass('activo')){

                var id = $(this).attr('id');
                var date = $('.calendar').attr('id');
                var day = $(this).data('day');

                var today = new Date();
                //almacenamos el v. año, mes, día y hora+minutos
                var year = today.getFullYear();
                var month = today.getMonth();
                var day = today.getUTCDate();
                var minutes = (today.getMinutes()<10?'0':'') + today.getMinutes();
                var hour = parseFloat(today.getHours()+'.'+minutes);

                var type = 'POST';
                var url = site_url+'/calendario/get_event_detail';
                var data = {'id':id,'date':date,'day':day};

                var eventDe = ActionAjax(type,url,data,null,null,true,false);
                eventDe = JSON.parse(eventDe);

                var html = getEventDetails(eventDe);

                $('.modal-title').html('Evento: <a target="_blank" href="'+site_url+'/clientes/edit/'+eventDe['calendar'][0].cl_id+'">'+eventDe['calendar'][0].cl_nombre)+'</a>';

                if(!eventDe['calendar'][0].c_estado){

                    html +='<div class="col-md-12"><h4><strong>Petición de cobertura</strong></h4></div>';

                    html +='<div class="form-group col-md-12">';
                    html +='<label>Realizar petición</label>';
                    html +='<select name="peticion-cobertura" class="form-control peticion-cobertura">';
                    html +='<option value="0">No</option>';
                    html +='<option value="1">Si</option>';
                    html +='</select>';
                    html +='</div>';

                    html +='<div style="display:none;" class="form-group col-md-12 direcciones-coberturas">';
                    html +='<label>Escribe la dirección o direcciones</label>';
                    html +='<textarea name="direcciones-coberturas" class="form-control" rows="3"></textarea>';
                    html +='</div>';

                    html +='<div class="col-md-12"><h4><strong>Realizar reporte</strong></h4></div>';

                    html +='<div class="form-group col-md-12">';
                    html +='<label>Tipo de reporte</label>';
                    html +='<select name="tipo-reporte" class="form-control">';
                    html +=eventDe['options'];
                    html +='</select>';
                    html +='</div>';

                    html +='<div class="form-group col-md-12">';
                    html +='<label>Reporte</label>';
                    html +='<textarea name="text-reporte" class="form-control" rows="3"></textarea>';
                    html +='</div>';

                    html +='<div class="form-group col-md-12">';
                    html +='<button class="btn green" name="submit-reporte-calendario" type="submit">Reportar</button>';
                    html +='</div>';

                }

                //html +=eventDe['calendar'][0].cs_tipo;
//console.log(eventDe['calendar'][0].cs);
                /*for (var i = 0; i < eventDe['calendar'][0].cs.length; i++) {
                    
                    eventDe['calendar'][0].cs[i];
                }*/

                
                html +='</div>';
                html +='</form>';
                html +='</div>';

                $('.modal-body').html(html);
                $('#eventoslistModal').modal('show');
            
            }
        });

        
        $('body').on('change', '.peticion-cobertura', function(){

            if($(this).val() == 0){

                $('.direcciones-coberturas').hide();

            }else if($(this).val() == 1){

                $('.direcciones-coberturas').show();

            }

        });

     },

     DeleteEvent: function(){

        $('body').on('click', '.delete-event', function(){

            var id = $(this).attr('id');
            
            var type = 'POST';
            var url = site_url+'/calendario/delete_event';
            var data = {'id':id};

            ActionAjax(type,url,data,null,null,false,false);

            //eliminamos el item de la tabla
            $('tbody tr#event-'+id).remove('tr#event-'+id);



        });

     },

     EditEvent: function(){

        $('body').on('click', '.edit-event', function(){

            var id = $(this).attr('id');
            
            var type = 'POST';
            var url = site_url+'/calendario/get_event_detail';
            var data = {'id':id};

            var event = ActionAjax(type,url,data,null,null,true,false);
            eventDe = JSON.parse(event);

            $('.modal-title').html('Evento: <a target="_blank" href="'+site_url+'/clientes/edit/'+eventDe['calendar'][0].cl_id+'">'+eventDe['calendar'][0].cl_nombre)+'</a>';

            var html = getEventDetails(eventDe);
            
            $('#eventoEditModal input[name="idEvent"]').val(eventDe['calendar'][0].c_id);
            $('.check-event').attr('key',eventDe['calendar'][0].c_id);

            html +='</div>';
            html +='</form>';
            html +='</div>';

            if(eventDe['calendar'][0].c_checkit)
            {
                $('.check-event').prop('checked', true);
            }

            $('.modal-body #content-event-details').html(html);

        });

        $('body').on('click', 'button[name="edit-submit"]', function(){

            var id = $('#form-edit form').attr('id');
            var date = $('#form-edit input[name="fEvent"]').val();
            var hour = $('#form-edit input[name="hEvent"]').val();
            var comment = $('#form-edit textarea[name="commentEvent"]').val();
            var user = $('#form-edit select[name="usuario"]').val();
            var _date = $('#table-calendar table').data('date');
            var _day = $('#table-calendar table').data('day');
            
            var type = 'POST';
            var url = site_url+'/calendario/edit_event';
            var data = {'id':id,'date':date,'hour':hour,'comment':comment,'user':user,'_date':_date,'_day':_day};
            ActionAjax(type,url,data,null,null,false,false);
            
            $('#eventoslistModal').modal('hide');
            addEventCalendar(_date);

        });

     },

}

function AddClassDays(){

    $('.day').each(function(){

        $(this).attr('id',"day-"+$(this).text());

    });
}

function addEventCalendar(date,userlist = false){

    //limpiamos el calendario
    $('.day p').remove('p');
    //obtenemos el día actual
    var today = new Date();
    //almacenamos el v. año, mes, día y hora+minutos
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getUTCDate();
    var minutes = (today.getMinutes()<10?'0':'') + today.getMinutes();
    var hour = parseFloat(today.getHours()+'.'+minutes);

    var user_list = '';

    if( $('.users').is(':checked') || userlist ){

        $('.users').each(function(){

            if( $(this).is(':checked') ){

                user_list += $(this).val()+',';

            }

        });

        user_list = user_list.substring(0, user_list.length-1);

        if(userlist){user_list = userlist;}
        
        var type = 'POST';
        var url = site_url+'/calendario/get_events';
        var data = {'user_list':user_list,'date':date};

        var events = ActionAjax(type,url,data,null,null,true,false);
        
        events = JSON.parse(events);

        var event='';

        //si user_list es distinto de vacío
        if(user_list != ""){

            $.each(events, function(key,value){

                event += '<p';
                event += ' id="'+value.id+'"';
                event += ' data-day="'+value.day+'"';

                

                    //if(value.year == year && parseInt(value.month) - 1 == month && value.day == day && value.hour < hour){
                    if(rol == 1 || rol == 8){

                        if(value.estado == 0){

                            event += 'class="btn-event" style="background-color:'+value.idusuario.color+'">';

                        }else{

                            event += 'class="btn-event" style="background-color:'+value.idusuario.color+';text-decoration: line-through;">';

                        }
                    
                    }else{

                        if(value.estado == 0){

                            event += ' class="btn-event activo" style="background-color:'+value.idusuario.color+'">';


                        }else{

                            event += ' class="btn-event activo" style="background-color:'+value.idusuario.color+';text-decoration: line-through;">';
                        }

                    }


                //comprobamos el rol del usuario, ya que este btn de edición solo se dibuja si este es superadmin = 1
                if(rol == 1 || rol == 8){

                   event += '<span id="'+value.id+'" data-toggle="modal" data-target="#eventoEditModal" style="color: rgb(0, 0, 0); background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; position: relative; top: 10px; right: 6px; width: 21px; height: 21px;" class="badge badge-success edit-event"><i class="fa fa-pencil"></i></span>';

                }

                if(rol == 7){

                    if(value.checkit){

                        event += '<span style="color: rgb(0, 0, 0); background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; position: relative; top: 10px; right: 6px; width: 21px; height: 21px;" class="badge badge-success edit-event"><i class="fa fa-eye"></i></span>';

                    }


                }

                event += value.idcliente.nombre;
                event += '<br/>';
                event += value.hour.replace('.', ':');
                event += '</p>';

                $('#day-'+value.day).append(event);

                event="";
             
            });

        }

    }
}

function getTableEvent(eventsL,date,day){

        var html = '';
        var _date ='';
        var _hour = '';

        html += '<table data-date="'+date+'" data-day="'+day+'" class="table table-hover table-light">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>Fecha</th>';
        html += '<th>Hora</th>';
        html += '<th>Acciones</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        $.each(eventsL, function(key,value){

            _date = value.fecha.date.split(' ');
            _hour = _date[1].split('.');

            html += '<tr id="event-'+value.id+'">';
            html += '<td>'+_date[0]+'</td>';
            html += '<td>'+_hour[0]+'</td>';
            html += '<td>';
            html += '<a id="'+value.id+'" style="cursor: pointer;" class="btn yellow edit-event" title="Editar"><i class="icon-pencil"></i></a>';
            html += '<a id="'+value.id+'" style="cursor: pointer;" class="btn red delete-event" title="Eliminar"><i class="icon-trash"></i></a>';
            html += '</td>';
            html += '</tr>';
         
        });

        html += '</tbody>';
        html += '</table>';

        $('#table-calendar').html(html);

    }

    function getEventDetails(obj){

    	var html='';

    	html +='<div class="row">';
        html +='<form method="post">';
        html +='<div class="form-body">';

        html +='<input type="hidden" name="id-calendario" value="'+obj['calendar'][0].c_id+'">';

        html +='<div class="form-group col-md-12">';
        html +='<label>Estado Seguimiento</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['cSeguimiento']+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-8">';
        html +='<label>Razón Social</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_nombre+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-4">';
        html +='<label>CIF</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_cif+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-6">';
        html +='<label>Fecha</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].c_day+'/'+obj['calendar'][0].c_month+'/'+obj['calendar'][0].c_year+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-6">';
        html +='<label>Hora</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].c_hour.replace(".", ":")+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-12">';
        html +='<label>Dirección</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_direccion+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-8">';
        html +='<label>Población</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_poblacion+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-4">';
        html +='<label>CP</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_cp+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-8">';
        html +='<label>Contacto</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_personacnt+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-4">';
        html +='<label>Telefono</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_telefono+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-8">';
        html +='<label>Operador</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].op_valor+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-4">';
        html +='<label>Nº líneas</label>';
        html +='<div class="input-group col-md-12">';
        html +='<input disabled class="form-control" type="text" value="'+obj['calendar'][0].cl_lineasmovil+'" />';
        html +='</div>';
        html +='</div>';

        html +='<div class="form-group col-md-12">';
        html +='<label>Comentarios</label>';
        html +='<textarea disabled class="form-control" rows="3">'+obj['calendar'][0].cl_descripcion+'</textarea>';
        html +='</div>';

        return html;
    }

$(window).load(Calendar.Start);
$(window).load(Calendar.NextPrev);
$(window).load(Calendar.CheckboxUser);
$(window).load(Calendar.ShowEventsDetail);
$(window).load(Calendar.DeleteEvent);
$(window).load(Calendar.EditEvent);

