<div class="col-md-4">

	<div class="portlet light bordered">

		<div class="portlet-title">

			<h4>Notas</h4>

		</div>

		<div class="portlet-body flip-scroll">
			<form id="form-notes" role="form" action="" method="post">

				<div class="form-body">

					<div class="form-group">

						<textarea name="note" class="form-control" id="note" data-registro="<?= $id ?>" data-usuario="<?= $usuarioid ?>" rows="5" style="width:100%; padding:5px" placeholder="Escribe aquí ..."></textarea>

					</div>

					<div class="form-body">
					
						<button class="btn green addnotes" type="submit">Agregar</button>
					
					</div>

				</div>

			</form>
		</div>
		<div class="portlet-footer">
			<hr>
			<div id="notas" class="list-group">
				<?php if(count($getNotes) > 0 ): ?>
					<?php foreach ($getNotes as $note): ?>

						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1"><?= $note->getIdusuario()->getNombre() ?></h5>
							</div>
							<p style="margin:8px 0px;"><?= $note->getNote() ?></p>
							<small><?= $note->getFregistro()->format('d/m/Y G:i') ?></small>
						</a>

					<?php endforeach ?>
				<?php endif; ?> 
			    <!--
				<a href="#" class="list-group-item list-group-item-action active">
					<div class="d-flex w-100 justify-content-between">
					<h5 class="mb-1">List group item heading</h5>
					</div>
					<p style="margin:8px 0px;">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
					<small>Donec id elit non mi porta.</small>
				</a>
				-->
			</div>
		</div>
	</div>

</div>
