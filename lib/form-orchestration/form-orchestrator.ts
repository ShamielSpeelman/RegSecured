/**
 * @fileoverview Form Orchestrator.
 *
 * This file contains the FormOrchestrator class, which is responsible for
 * managing the form workflow for different entity types and scenarios.
 */

import type { EntityType, OnboardingScenario, RelationshipRole } from "../../types/entity"
import type { FormDefinition } from "../../types/form"

export const FORM_DEFINITIONS: FormDefinition[] = []

export class FormOrchestrator {
  /**
   * Get the workflow for a specific entity and scenario.
   */
  static getWorkflow(entityType: EntityType, scenario: OnboardingScenario, role?: RelationshipRole): FormDefinition[] {
    // TODO: Implement this method to return the correct workflow based on the entity type and scenario.
    // This is just a placeholder implementation.
    return []
  }

  /**
   * Get workflow progress for a specific entity and scenario
   */
  static getWorkflowProgress(
    completedForms: string[],
    entityType: EntityType,
    scenario: OnboardingScenario,
    role?: RelationshipRole,
  ): {
    progress: number
    nextForms: FormDefinition[]
    completedCount: number
    totalCount: number
  } {
    const workflow = this.getWorkflow(entityType, scenario, role)
    const totalCount = workflow.length
    const completedCount = completedForms.length
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

    const nextForms = workflow.filter((form) => !completedForms.includes(form.id)).slice(0, 3)

    return {
      progress,
      nextForms,
      completedCount,
      totalCount,
    }
  }
}
