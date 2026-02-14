import { Injectable, Inject, computed, signal } from '@angular/core';
import { merge } from 'lodash-es';
import { SidebarModel } from '../models/sidebar-input-model';
import { SIDEBAR_GLOBAL_OPTIONS, SIDEBAR_DEFAULT_OPTIONS } from '../tokens/sidebar-options.token';

@Injectable()
export class SidebarFacade {
  private inputModel = signal<SidebarModel | null>(null);

  constructor(
    @Inject(SIDEBAR_GLOBAL_OPTIONS)
    private globalOptions: SidebarModel | null,
  ) {}

  setModel(model: SidebarModel) {
    this.inputModel.set(model);
  }

  readonly resolvedModel = computed(() => {
    const model = this.inputModel();
    if (!model) return SIDEBAR_DEFAULT_OPTIONS;

    return merge({}, SIDEBAR_DEFAULT_OPTIONS, this.globalOptions ?? {}, model);
  });
}
