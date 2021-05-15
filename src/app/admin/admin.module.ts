import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcedataComponent } from './components/sourcedata/sourcedata.component';
import { ConditionComponent } from './components/sourcedata/basedata/condition/condition.component';
import { SourceComponent } from './components/sourcedata/source/source.component';
import { AddSourceComponent } from './components/sourcedata/source/add-source/add-source.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSourceComponent } from './components/sourcedata/source/edit-source/edit-source.component';
import { DeleteSourceComponent } from './components/sourcedata/source/delete-source/delete-source.component';
import { ModifierComponent } from './components/sourcedata/modifier/modifier.component';
import { AbilityComponent } from './components/sourcedata/ability/ability/ability.component';
import { FeatComponent } from './components/sourcedata/feat/feat.component';
import { EquipmentComponent } from './components/sourcedata/equipment/equipment.component';
import { SpellComponent } from './components/sourcedata/spell/spell.component';
import { ClassComponent } from './components/sourcedata/class/class.component';
import { RaceComponent } from './components/sourcedata/race/race.component';
import { SpeedComponent } from './components/sourcedata/basedata/speed/speed.component';
import { SkillComponent } from './components/sourcedata/basedata/skill/skill.component';
import { SenseComponent } from './components/sourcedata/basedata/sense/sense.component';
import { ProficiencyComponent } from './components/sourcedata/basedata/proficiency/proficiency.component';
import { MagicSchoolComponent } from './components/sourcedata/basedata/magic-school/magic-school.component';
import { DamageTypeComponent } from './components/sourcedata/basedata/damage-type/damage-type.component';
import { AbilityScoreComponent } from './components/sourcedata/basedata/ability-score/ability-score.component';
import { AddAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/add-ability-score/add-ability-score.component';
import { EditAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/edit-ability-score/edit-ability-score.component';
import { DeleteAbilityScoreComponent } from './components/sourcedata/basedata/ability-score/delete-ability-score/delete-ability-score.component';
import { AddConditionComponent } from './components/sourcedata/basedata/condition/add-condition/add-condition.component';
import { EditConditionComponent } from './components/sourcedata/basedata/condition/edit-condition/edit-condition.component';
import { DeleteConditionComponent } from './components/sourcedata/basedata/condition/delete-condition/delete-condition.component';
import { AddDamageTypeComponent } from './components/sourcedata/basedata/damage-type/add-damage-type/add-damage-type.component';
import { EditDamageTypeComponent } from './components/sourcedata/basedata/damage-type/edit-damage-type/edit-damage-type.component';
import { DeleteDamageTypeComponent } from './components/sourcedata/basedata/damage-type/delete-damage-type/delete-damage-type.component';
import { AddMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/add-magic-school/add-magic-school.component';
import { EditMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/edit-magic-school/edit-magic-school.component';
import { DeleteMagicSchoolComponent } from './components/sourcedata/basedata/magic-school/delete-magic-school/delete-magic-school.component';
import { AddProficiencyComponent } from './components/sourcedata/basedata/proficiency/add-proficiency/add-proficiency.component';
import { EditProficiencyComponent } from './components/sourcedata/basedata/proficiency/edit-proficiency/edit-proficiency.component';
import { DeleteProficiencyComponent } from './components/sourcedata/basedata/proficiency/delete-proficiency/delete-proficiency.component';
import { AddSenseComponent } from './components/sourcedata/basedata/sense/add-sense/add-sense.component';
import { EditSenseComponent } from './components/sourcedata/basedata/sense/edit-sense/edit-sense.component';
import { DeleteSenseComponent } from './components/sourcedata/basedata/sense/delete-sense/delete-sense.component';
import { AddSkillComponent } from './components/sourcedata/basedata/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/sourcedata/basedata/skill/edit-skill/edit-skill.component';
import { DeleteSkillComponent } from './components/sourcedata/basedata/skill/delete-skill/delete-skill.component';
import { AddSpeedComponent } from './components/sourcedata/basedata/speed/add-speed/add-speed.component';
import { EditSpeedComponent } from './components/sourcedata/basedata/speed/edit-speed/edit-speed.component';
import { DeleteSpeedComponent } from './components/sourcedata/basedata/speed/delete-speed/delete-speed.component';
import { AddRaceComponent } from './components/sourcedata/race/add-race/add-race.component';
import { EditRaceComponent } from './components/sourcedata/race/edit-race/edit-race.component';
import { DeleteRaceComponent } from './components/sourcedata/race/delete-race/delete-race.component';
import { AddFeatComponent } from './components/sourcedata/feat/add-feat/add-feat.component';
import { EditFeatComponent } from './components/sourcedata/feat/edit-feat/edit-feat.component';
import { DeleteFeatComponent } from './components/sourcedata/feat/delete-feat/delete-feat.component';
import { MeleeAttackComponent } from './components/sourcedata/ability/melee-attack/melee-attack.component';
import { RangedAttackComponent } from './components/sourcedata/ability/ranged-attack/ranged-attack.component';
import { CastSpellComponent } from './components/sourcedata/ability/cast-spell/cast-spell.component';
import { AddCastSpellComponent } from './components/sourcedata/ability/cast-spell/add-cast-spell/add-cast-spell.component';
import { EditCastSpellComponent } from './components/sourcedata/ability/cast-spell/edit-cast-spell/edit-cast-spell.component';
import { DeleteCastSpellComponent } from './components/sourcedata/ability/cast-spell/delete-cast-spell/delete-cast-spell.component';
import { AddRangedAttackComponent } from './components/sourcedata/ability/ranged-attack/add-ranged-attack/add-ranged-attack.component';
import { EditRangedAttackComponent } from './components/sourcedata/ability/ranged-attack/edit-ranged-attack/edit-ranged-attack.component';
import { DeleteRangedAttackComponent } from './components/sourcedata/ability/ranged-attack/delete-ranged-attack/delete-ranged-attack.component';
import { AddMeleeAttackComponent } from './components/sourcedata/ability/melee-attack/add-melee-attack/add-melee-attack.component';
import { EditMeleeAttackComponent } from './components/sourcedata/ability/melee-attack/edit-melee-attack/edit-melee-attack.component';
import { DeleteMeleeAttackComponent } from './components/sourcedata/ability/melee-attack/delete-melee-attack/delete-melee-attack.component';
import { AddAbilityComponent } from './components/sourcedata/ability/ability/add-ability/add-ability.component';
import { EditAbilityComponent } from './components/sourcedata/ability/ability/edit-ability/edit-ability.component';
import { DeleteAbilityComponent } from './components/sourcedata/ability/ability/delete-ability/delete-ability.component';
import { AddAttackDamageComponent } from './components/sourcedata/damage/attack-damage/add-attack-damage/add-attack-damage.component';
import { EditAttackDamageComponent } from './components/sourcedata/damage/attack-damage/edit-attack-damage/edit-attack-damage.component';
import { DeleteAttackDamageComponent } from './components/sourcedata/damage/attack-damage/delete-attack-damage/delete-attack-damage.component';
import { AddModifierComponent } from './components/sourcedata/modifier/add-modifier/add-modifier.component';
import { GetModifierTypeComponent } from './components/sourcedata/modifier/get-modifier-type/get-modifier-type.component';
import { EditModifierComponent } from './components/sourcedata/modifier/edit-modifier/edit-modifier.component';
import { DeleteModifierComponent } from './components/sourcedata/modifier/delete-modifier/delete-modifier.component';
import { AddSpellComponent } from './components/sourcedata/spell/add-spell/add-spell.component';
import { EditSpellComponent } from './components/sourcedata/spell/edit-spell/edit-spell.component';
import { DeleteSpellComponent } from './components/sourcedata/spell/delete-spell/delete-spell.component';
import { AddSpellDamageComponent } from './components/sourcedata/damage/spell-damage/add-spell-damage/add-spell-damage.component';
import { EditSpellDamageComponent } from './components/sourcedata/damage/spell-damage/edit-spell-damage/edit-spell-damage.component';
import { DeleteSpellDamageComponent } from './components/sourcedata/damage/spell-damage/delete-spell-damage/delete-spell-damage.component';
import { AddAreaEffectComponent } from './components/sourcedata/area-effect/add-area-effect/add-area-effect.component';
import { EditAreaEffectComponent } from './components/sourcedata/area-effect/edit-area-effect/edit-area-effect.component';
import { DeleteAreaEffectComponent } from './components/sourcedata/area-effect/delete-area-effect/delete-area-effect.component';
import { BranchingComponent } from './components/branching/branching.component';
import { BranchingRaceComponent } from './components/branching/branching-race/branching-race.component';
import { BranchingClassComponent } from './components/branching/branching-class/branching-class.component';
import { BranchingFeatComponent } from './components/branching/branching-feat/branching-feat.component';
import { BranchingAbilityComponent } from './components/branching/branching-ability/branching-ability.component';
import { TemplateRaceComponent } from './components/branching/template-race/template-race.component';
import { TemplateAbilityComponent } from './components/branching/template-ability/template-ability.component';
import { TemplateFeatComponent } from './components/branching/template-feat/template-feat.component';
import { TemplateSpellComponent } from './components/branching/template-spell/template-spell.component';
import { TemplateModifierComponent } from './components/branching/template-modifier/template-modifier.component';
import { TemplateChoiceComponent } from './components/branching/template-choice/template-choice.component';
import { ModalAddChoiceComponent } from './components/branching/modal-add-choice/modal-add-choice.component';
import { ModalAddOptionComponent } from './components/branching/modal-add-option/modal-add-option.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DeleteUserComponent } from './components/user-management/delete-user/delete-user.component';
import { ResendConfirmationComponent } from './components/user-management/resend-confirmation/resend-confirmation.component';
import { ForgotPasswordComponent } from './components/user-management/forgot-password/forgot-password.component';



@NgModule({
  declarations: [SourcedataComponent, ConditionComponent, SourceComponent, AddSourceComponent, EditSourceComponent, DeleteSourceComponent, ModifierComponent, AbilityComponent, FeatComponent, EquipmentComponent, SpellComponent, ClassComponent, RaceComponent, SpeedComponent, SkillComponent, SenseComponent, ProficiencyComponent, MagicSchoolComponent, DamageTypeComponent, AbilityScoreComponent, AddAbilityScoreComponent, EditAbilityScoreComponent, DeleteAbilityScoreComponent, AddConditionComponent, EditConditionComponent, DeleteConditionComponent, AddDamageTypeComponent, EditDamageTypeComponent, DeleteDamageTypeComponent, AddMagicSchoolComponent, EditMagicSchoolComponent, DeleteMagicSchoolComponent, AddProficiencyComponent, EditProficiencyComponent, DeleteProficiencyComponent, AddSenseComponent, EditSenseComponent, DeleteSenseComponent, AddSkillComponent, EditSkillComponent, DeleteSkillComponent, AddSpeedComponent, EditSpeedComponent, DeleteSpeedComponent, AddRaceComponent, EditRaceComponent, DeleteRaceComponent, AddFeatComponent, EditFeatComponent, DeleteFeatComponent, MeleeAttackComponent, RangedAttackComponent, CastSpellComponent, AddCastSpellComponent, EditCastSpellComponent, DeleteCastSpellComponent, AddRangedAttackComponent, EditRangedAttackComponent, DeleteRangedAttackComponent, AddMeleeAttackComponent, EditMeleeAttackComponent, DeleteMeleeAttackComponent, AddAbilityComponent, EditAbilityComponent, DeleteAbilityComponent, AddAttackDamageComponent, EditAttackDamageComponent, DeleteAttackDamageComponent, AddModifierComponent, GetModifierTypeComponent, EditModifierComponent, DeleteModifierComponent, AddSpellComponent, EditSpellComponent, DeleteSpellComponent, AddSpellDamageComponent, EditSpellDamageComponent, DeleteSpellDamageComponent, AddAreaEffectComponent, EditAreaEffectComponent, DeleteAreaEffectComponent, BranchingComponent, BranchingRaceComponent, BranchingClassComponent, BranchingFeatComponent, BranchingAbilityComponent, TemplateRaceComponent, TemplateAbilityComponent, TemplateFeatComponent, TemplateSpellComponent, TemplateModifierComponent, TemplateChoiceComponent, ModalAddChoiceComponent, ModalAddOptionComponent, UserManagementComponent, DeleteUserComponent, ResendConfirmationComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'sourcedata', component: SourcedataComponent,
        children: [
          { path: 'abilityscore', component: AbilityScoreComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'condition', component: ConditionComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'damagetype', component: DamageTypeComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'magicschool', component: MagicSchoolComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'proficiency', component: ProficiencyComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'sense', component: SenseComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'skill', component: SkillComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'speed', component: SpeedComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'race', component: RaceComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'feat', component: FeatComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'ability', component: AbilityComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'meleeattack', component: MeleeAttackComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'rangedattack', component: RangedAttackComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'castspell', component: CastSpellComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'modifier', component: ModifierComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'spell', component: SpellComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'source', component: SourceComponent, outlet: 'admin-sourcedata-outlet' }
        ]
      },
      {
        path: 'branching', component: BranchingComponent,
        children: [
          { path: 'race', component: BranchingRaceComponent, outlet: 'admin-branching-outlet' },
          { path: 'class', component: BranchingClassComponent, outlet: 'admin-branching-outlet' },
          { path: 'feat', component: BranchingFeatComponent, outlet: 'admin-branching-outlet' },
          { path: 'ability', component: BranchingAbilityComponent, outlet: 'admin-branching-outlet' }
        ]
      },
      {
        path: 'usermanagement', component: UserManagementComponent
      }
    ])
  ]
})
export class AdminModule { }
