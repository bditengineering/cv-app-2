"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/ui/tab";
import { FieldArray, useFormikContext, type ArrayHelpers } from "formik";
import Checkbox from "@/ui/checkbox";
import { CVDetails, OrderedSkillGroup, SkillWithoutGroup } from "@/types";
import { ChangeEvent } from "react";

interface TechnicalSkillsSectionProps {
  skills: OrderedSkillGroup;
}

const TechnicalSkillsSection = ({ skills }: TechnicalSkillsSectionProps) => {
  const { values } = useFormikContext<CVDetails>();

  const isChecked = (skill: SkillWithoutGroup) =>
    values?.cv_skill?.some((CVSkill) => CVSkill.skill_id === skill.id);

  const handleOnCheck = (
    event: ChangeEvent<HTMLInputElement>,
    arrayHelpers: ArrayHelpers,
    skill: SkillWithoutGroup,
  ) => {
    if (event.target.checked) {
      arrayHelpers.push({ skill_id: skill.id });
    } else {
      const index = values?.cv_skill?.findIndex(
        (CVSkill) => CVSkill.skill_id === skill.id,
      );
      if (index && index >= 0) {
        arrayHelpers.remove(index);
      }
    }
  };

  return (
    <TabGroup>
      <TabList>
        {Object.values(skills).map((skillGroup: OrderedSkillGroup[number]) => (
          <Tab key={skillGroup.group_name}>{skillGroup.group_name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        <FieldArray
          name="cv_skill"
          render={(arrayHelpers: ArrayHelpers) => (
            <>
              {Object.values(skills).map(
                (skillGroup: OrderedSkillGroup[number]) => (
                  <TabPanel
                    className="grid gap-3 px-1.5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
                    key={skillGroup.group_name}
                  >
                    {skillGroup.skills.map((skill) => (
                      <Checkbox
                        checked={!!isChecked(skill)}
                        key={skill.id}
                        name={"cv_skill-" + skill.id}
                        onChange={(event) =>
                          handleOnCheck(event, arrayHelpers, skill)
                        }
                      >
                        {skill.name}
                      </Checkbox>
                    ))}
                  </TabPanel>
                ),
              )}
            </>
          )}
        />
      </TabPanels>
    </TabGroup>
  );
};

export default TechnicalSkillsSection;
