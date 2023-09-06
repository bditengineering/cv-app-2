import { OrderedSkillGroup, SkillGroupResponse } from "@/types";

export function transformSkills(response: SkillGroupResponse[] | null) {
  if (response == null) return {};

  return response.reduce<OrderedSkillGroup>((acc, skill) => {
    const order = skill?.skill_group?.order;

    if (!order) return acc;

    if (!acc[order]) {
      acc[order] = {
        group_name: skill?.skill_group?.name || null,
        skills: [],
      };
    }

    acc[order].skills.push({
      name: skill.name,
      id: skill.id,
    });

    return acc;
  }, {});
}
