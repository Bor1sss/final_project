
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from "./casl-ability.factory";
import { PoliciesGuard } from "../guards/policies.guard";

@Module({
  providers: [PoliciesGuard, CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
