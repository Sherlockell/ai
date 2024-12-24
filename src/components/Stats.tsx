import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const stats = [
  { value: '100+', label: 'SMBs Empowered' },
  { value: '95%', label: 'Customer Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '50%', label: 'Average Cost Reduction' }
];

export default function Stats() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10"></div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <dt className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                {stat.value}
              </dt>
              <dd className="text-sm text-gray-400">{stat.label}</dd>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}