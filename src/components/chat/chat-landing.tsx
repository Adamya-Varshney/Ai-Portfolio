'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, Code, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import React from 'react';

import { presetReplies } from '@/lib/config-loader';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, handlePresetReply }) => {
  const suggestedQuestions = [
    { icon: <MessageSquare className="h-4 w-4" />, text: 'Who are you?' },
    { icon: <Code className="h-4 w-4" />, text: 'What projects are you most proud of?' },
    { icon: <Award className="h-4 w-4" />, text: 'What are your skills?' },
    { icon: <Briefcase className="h-4 w-4" />, text: 'Am I available for opportunities?' },
    { icon: <Mail className="h-4 w-4" />, text: 'How can I reach you?' },
  ];

  const handleQuestionClick = (questionText: string) => {
    const preset = presetReplies[questionText as keyof typeof presetReplies];
    if (preset && handlePresetReply) {
      handlePresetReply(questionText, preset.reply, preset.tool);
    } else {
      submitQuery(questionText);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as any } },
  };

  return (
    <motion.div
      className="w-full px-3 sm:px-4 py-4 sm:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Mobile layout: stacked (unchanged) */}
      <div className="flex flex-col items-center lg:hidden">
        <motion.div className="mb-6 sm:mb-8 text-center" variants={itemVariants}>
          <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-semibold">
            I'm Adamya's AI twin
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mx-auto max-w-xs sm:max-w-md">
            Ask me anything about my product work — projects, GTM, and AI.
          </p>
        </motion.div>

        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <motion.button
            onClick={() => handleQuestionClick('Am I available for opportunities?')}
            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available for Opportunities
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3"
          variants={containerVariants}
        >
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              className="bg-accent hover:bg-accent/80 flex w-full items-center rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 transition-colors"
              onClick={() => handleQuestionClick(question.text)}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-background mr-3 rounded-full p-1.5 sm:p-2">
                {question.icon}
              </span>
              <span className="text-sm sm:text-base text-left">{question.text}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Desktop layout: two columns */}
      <div className="hidden lg:flex items-stretch gap-12 w-full min-h-[60vh]">
        {/* Left — hero */}
        <motion.div
          className="flex flex-col justify-center flex-1 max-w-lg"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => handleQuestionClick('Am I available for opportunities?')}
              className="mb-8 bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for Opportunities
            </motion.button>
          </motion.div>

          <motion.h1
            className="text-4xl xl:text-5xl font-semibold leading-tight text-foreground mb-4"
            variants={itemVariants}
          >
            I'm Adamya's<br />AI twin
          </motion.h1>

          <motion.p
            className="text-base xl:text-lg text-muted-foreground mb-10 leading-relaxed max-w-sm"
            variants={itemVariants}
          >
            Ask me anything about his product work — projects, GTM strategy, and AI.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
            {[
              { label: '3.5+ yrs', sub: 'PM experience' },
              { label: '100+ Cr', sub: 'monthly revenue' },
              { label: '17%', sub: 'retention lift' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border bg-accent px-4 py-3 min-w-[90px]">
                <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="w-px bg-border self-stretch" />

        {/* Right — suggested questions */}
        <motion.div
          className="flex flex-col justify-center flex-1 max-w-md space-y-3"
          variants={containerVariants}
        >
          <motion.p
            className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1"
            variants={itemVariants}
          >
            Quick questions
          </motion.p>
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              className="group flex w-full items-center justify-between rounded-xl border bg-accent hover:bg-accent/60 px-4 py-3.5 transition-colors text-left"
              onClick={() => handleQuestionClick(question.text)}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <span className="bg-background rounded-full p-2 text-foreground">
                  {question.icon}
                </span>
                <span className="text-sm font-medium text-foreground">{question.text}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatLanding;
