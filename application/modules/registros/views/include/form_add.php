<form role="form" method="post">

    <?= validation_errors(); ?>

    <div class="form-body">

        <?php if ($rol != 4): ?>

            <div class="form-group">

                <label>Operario</label>

                <select name="usuario" class="form-control">

                    <?php foreach($getUsuarios as $usuario): ?>

                        <option value="<?= $usuario->getId() ?>"><?= $usuario->getNombre() ?> <?= $usuario->getApellidos() ?></option>

                    <?php endforeach ?>

                </select>

            </div>


        <?php endif ?>

    <div class="row">
        <div class="col-md-4">

            <div class="form-group">
                <label> Fecha de Registro</label>

                <div class="input-group date date-picker" data-date-format="dd-mm-yyyy" data-date-week-start="1" data-date-language="es">

                    <input name="fRegistro" value="09-04-2019" type="text" class="form-control" readonly="">

                    <span class="input-group-btn">

                        <button class="btn default" type="button">

                            <i class="fa fa-calendar"></i>

                        </button>

                    </span>

                </div>

            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">

                <label>Campaña</label>

                <div class="input-group col-md-12">

                    <select name="campaign" class="form-control md-select">
                        <option value=""></option>
                        <?php foreach ($getCampaigns as $campaign): ?>
                            <option value="<?= $campaign->getId() ?>"> <?= $campaign->getName() ?> </option>
                        <?php endforeach ?>
                    </select>

                </div>

            </div>
        </div>
        <div class="col-md-4"> 
            <div class="form-group">
                
                <label>Operario</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>
                    
                    <?php

                        $user = $this->doctrine->em->find("Entities\\Usuarios", $this->session->userdata('usuarioid'));
                    ?>

                    <input type="text" class="form-control md-text" value="<?= $user->getNombre() ?> <?= $user->getApellidos() ?>" readonly>

                    <input name="user" type="hidden" value="<?= $this->session->userdata('usuarioid') ?>" class="form-control md-text" type="text">

                </div>

            </div>  
        </div>

        <div class="clearfix"></div>

        <div class="col-md-4">
            <div class="form-group">
                
                <label>Nombre</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="name" value="" class="form-control md-text" type="text">

                </div>

            </div>  
        </div>
        <div class="col-md-4">
            <div class="form-group">

                <label>Apellido1</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="first_name" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Apellido2</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="last_name" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>DNI</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="document_number" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>
        
        <div class="col-md-4">

            <div class="form-group">
                <label>Fecha de Nacimiento</label>

                <div class="input-group date date-picker" data-date-format="dd-mm-yyyy" data-date-week-start="1" data-date-language="es">

                    <input name="bird_date" value="09-04-2019" type="text" class="form-control" readonly="">

                    <span class="input-group-btn">

                        <button class="btn default" type="button">

                            <i class="fa fa-calendar"></i>

                        </button>

                    </span>

                </div>

            </div>

        </div>

        <div class="col-md-2">
            <div class="form-group">

                <label>Edad actuarial</label>

                <div class="input-group col-md-12">
                    
                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="age" class="form-control md-text" value="0" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-2">
            <div class="form-group">

                <label>Sexo</label>

                <div class="input-group col-md-12">

                    <select name="gender" class="form-control md-select">

                        <option></option>
                        <option value="M">H</option>
                        <option value="F">M</option>

                    </select>

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Teléfono</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="telephone" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Móvil</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Email</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="email" value="" class="form-control md-text" type="text">

                </div>

            </div>

        </div>
        
        <div class="col-md-4">
            <div class="form-group">

                <label>Modalidad</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="modality" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>


        <div class="col-md-4">


            <div class="form-group">

                <label>Periocidad</label>

                <div class="input-group col-md-12">

                   <select name="periodicity" class="form-control md-select">

                        <option></option>
                        <option value="Anual">Anual</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Único">Único</option>

                   </select>

                </div>

            </div>

        </div>

        <div class="col-md-4">

            <div class="form-group">
                <label>Vencimiento</label>

                <div class="input-group date date-picker" data-date-format="dd-mm-yyyy" data-date-week-start="1" data-date-language="es">

                    <input  name="renovation" value="09-04-2019" type="text" class="form-control" readonly="">

                    <span class="input-group-btn">

                        <button class="btn default" type="button">

                            <i class="fa fa-calendar"></i>

                        </button>

                    </span>

                </div>

            </div>

        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Capital</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="capital" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Prima</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="prima" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Cob. Actual</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="actual_cob" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>
        
        <div class="col-md-4">
            <div class="form-group">

                <label>Cuenta Corriente</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="checking_account" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">

            <div class="form-group">

                <label>Prima OPC1</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="prima_opc1" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>

            <div class="form-group">

                <label>Ahorro. € OPC1</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="ahorroeu_opc1" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>

        </div>


        <div class="col-md-4">
            <div class="form-group">

                <label>Cob. OPC1</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="cob_opc1" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>

            <div class="form-group">

                <label>Ahorro % OPC1</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="ahorropercent_opc1" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Prima OPC2</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="Prima_opc2" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>

            <div class="form-group">

                <label>Ahorro. € OPC2</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="ahorroeu_opc2" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>
        
        
        <div class="col-md-4">
            <div class="form-group">

                <label>Cob. OPC2</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="cob_opc1" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>

            <div class="form-group">

                <label>Ahorro % OPC2</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="ahorropercent_opc2" value="0.00" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Nueva Periocidad</label>

                <div class="input-group col-md-12">

                    <select name="new_periodicity" class="form-control md-select">
                        <option></option>
                        <option value="Anual">Anual</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Único">Único</option>
                    </select>

                </div>

            </div>
        </div>


        <div class="col-md-4">
            <div class="form-group">

                <label>Nº Prestamo</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="lending_number " value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Selección Médica</label>
                
                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="selec_ries " value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>


        <div class="col-md-8">

            <div class="form-group">

                <label>Dirección</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="address" value="" class="form-control md-text" placeholder="Persona que consta como administrador de la empresa" type="text">

                </div>

            </div>
            
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>CP</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="zip" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">

                <label>Población</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="city" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>
        
        <div class="col-md-4">
            <div class="form-group">

                <label>Provincia</label>

                <div class="input-group col-md-12">

                    <span class="input-group-addon">
                        <i class="fa fa-pencil"></i>
                    </span>

                    <input name="province" value="" class="form-control md-text" type="text">

                </div>

            </div>
        </div>

        <div class="clearfix"></div>
        <div class="form-group col-md-12">

            <button name="submit" class="btn green" type="submit">Guardar</button>

        </div>
                
    </div>

    </div>

</form>