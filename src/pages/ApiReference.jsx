import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import { FaSearch, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const apiClasses = [
  {
    name: 'SwerveDrive',
    package: 'org.frclib.drive.swerve',
    description: 'Main class for controlling a swerve drive system.',
    methods: [
      {
        name: 'drive',
        signature: 'public void drive(double xSpeed, double ySpeed, double rotation, boolean fieldRelative)',
        description: 'Drives the robot using the specified x, y, and rotational speeds.',
        parameters: [
          { name: 'xSpeed', type: 'double', description: 'Speed of the robot in the x direction (forward/backwards).' },
          { name: 'ySpeed', type: 'double', description: 'Speed of the robot in the y direction (left/right).' },
          { name: 'rotation', type: 'double', description: 'Rotational speed of the robot.' },
          { name: 'fieldRelative', type: 'boolean', description: 'Whether the drive is field-relative.' }
        ],
        returns: { type: 'void', description: 'No return value.' }
      },
      {
        name: 'followPath',
        signature: 'public Command followPath(Path path, boolean resetPose)',
        description: 'Creates a command to follow the specified path.',
        parameters: [
          { name: 'path', type: 'Path', description: 'The path to follow.' },
          { name: 'resetPose', type: 'boolean', description: 'Whether to reset the robot pose to the start of the path.' }
        ],
        returns: { type: 'Command', description: 'A command that will follow the specified path.' }
      }
    ]
  },
  {
    name: 'SwerveModule',
    package: 'org.frclib.drive.swerve',
    description: 'Represents a single swerve module with drive and steer motors.',
    methods: [
      {
        name: 'setDesiredState',
        signature: 'public void setDesiredState(SwerveModuleState desiredState, boolean optimize)',
        description: 'Sets the desired state for this swerve module.',
        parameters: [
          { name: 'desiredState', type: 'SwerveModuleState', description: 'The desired state of the module.' },
          { name: 'optimize', type: 'boolean', description: 'Whether to optimize the module state to minimize rotation.' }
        ],
        returns: { type: 'void', description: 'No return value.' }
      }
    ]
  },
  {
    name: 'ArmMechanism',
    package: 'org.frclib.mechanisms',
    description: 'A mechanism for controlling a robot arm with multiple joints.',
    methods: [
      {
        name: 'setPosition',
        signature: 'public void setPosition(double angleRadians)',
        description: 'Sets the target position of the arm.',
        parameters: [
          { name: 'angleRadians', type: 'double', description: 'The desired angle of the arm in radians.' }
        ],
        returns: { type: 'void', description: 'No return value.' }
      }
    ]
  }
];

const ApiReference = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClass, setExpandedClass] = useState(null);
  
  const filteredClasses = apiClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleClass = (className) => {
    if (expandedClass === className) {
      setExpandedClass(null);
    } else {
      setExpandedClass(className);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-6">
        API Reference
      </h1>
      
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
        Comprehensive documentation for all classes and methods in the FRCLib library.
      </p>
      
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search classes, methods, or packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div className="space-y-6">
        {filteredClasses.map((cls) => (
          <div key={cls.name} className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => toggleClass(cls.name)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            >
              <div>
                <h2 className="text-xl font-semibold text-primary-900 dark:text-white">
                  {cls.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                  {cls.package}
                </p>
              </div>
              {expandedClass === cls.name ? (
                <FaChevronDown className="h-5 w-5 text-slate-500" />
              ) : (
                <FaChevronRight className="h-5 w-5 text-slate-500" />
              )}
            </button>
            
            {expandedClass === cls.name && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  {cls.description}
                </p>
                
                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                  Methods
                </h3>
                
                <div className="space-y-6">
                  {cls.methods.map((method, index) => (
                    <div key={index} className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                      <h4 className="text-md font-semibold text-primary-800 dark:text-primary-400 mb-2">
                        {method.name}
                      </h4>
                      
                      <CodeBlock language="java">
                        {method.signature}
                      </CodeBlock>
                      
                      <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {method.description}
                      </p>
                      
                      {method.parameters && method.parameters.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Parameters:
                          </h5>
                          <ul className="pl-6 space-y-2">
                            {method.parameters.map((param, paramIndex) => (
                              <li key={paramIndex} className="text-slate-700 dark:text-slate-300">
                                <span className="font-mono text-secondary-600 dark:text-secondary-400">{param.name}</span> 
                                <span className="text-slate-500 dark:text-slate-400"> ({param.type})</span> - {param.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {method.returns && (
                        <div>
                          <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Returns:
                          </h5>
                          <p className="pl-6 text-slate-700 dark:text-slate-300">
                            <span className="text-slate-500 dark:text-slate-400">({method.returns.type})</span> - {method.returns.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredClasses.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-700 dark:text-slate-300">
              No classes found matching "{searchTerm}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiReference;