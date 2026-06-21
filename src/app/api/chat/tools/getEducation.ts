import { tool } from 'ai';
import { z } from 'zod';
import { getConfig } from '@/lib/config-loader';

export const getEducation = tool({
  description:
    'This tool provides detailed educational background including degrees, institutions, academic performance, and achievements.',
  parameters: z.object({}),
  execute: async () => {
    const config = getConfig();

    return {
      education: {
        current: config.education.current,
        previous: config.education.previous,
        achievements: config.education.achievements,
      },
      message:
        "Here's a detailed overview of my educational background. I hold an MBA with majors in IT-Data Analytics & Marketing from IIM Kashipur, and a B.Tech in Electronics & Communication Engineering from ZHCET, AMU. My academic journey has been complemented by significant achievements including national-level competitions and consulting engagements. Would you like to know more about any specific aspect of my education?",
    };
  },
});
