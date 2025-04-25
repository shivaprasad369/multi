import { getPayload } from "payload"
import config from '../payload.config'
const categories=[
    {
        name:"All",
        slug:'all',
    },
    {
        name:"Software Development",
        slug:'software-development',
        color:'#FF5733',
        subcategories:[
            {
                name:"Web Development",
                slug:'web-development',
            },
            {
                name:"Mobile Development",
                slug:'mobile-development',
            },
            {
                name:"Game Development",
                slug:'game-development',
            },
        ]
    },{

        name:"Data Science",
        slug:'data-science',
        color:'#33FF57',
        subcategories:[
            {
                name:"Machine Learning",
                slug:'machine-learning',
            },
            {
                name:"Data Analysis",
                slug:'data-analysis',
            },
            {
                name:"Data Visualization",
                slug:'data-visualization',
            },
        ]
    },{
        name:"Cloud Computing",
        slug:'cloud-computing',
        color:'#3357FF',
        subcategories:[
            {
                name:"AWS",
                slug:'aws',
            },
            {
                name:"Azure",
                slug:'azure',
            },
            {
                name:"Google Cloud",
                slug:'google-cloud',
            },
        ]
    },
    {
        name:'Electrionics',
        slug:'electrionics',
        color:'#FF33A1',
        subcategories:[
            {
                name:"Arduino",
                slug:'arduino',
            },
            {
                name:"Raspberry Pi",
                slug:'raspberry-pi',
            },
            {
                name:"Microcontrollers",
                slug:'microcontrollers',
            },
            {
                name:"Phones",
                slug:'phones',
            },
            {
                name:"Laptops",
                slug:'laptops',
            },
            {
                name:"Tablets",
                slug:'tablets',
            }
        ]
    },
  
    {
        name:'Cyber Security',
        slug:'cyber-security',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Network Security",
                slug:'network-security',
            },
            {
                name:"Application Security",
                slug:'application-security',
            },
            {
                name:"Cloud Security",
                slug:'cloud-security',
            },
            {
                name:"IoT Security",
                slug:'iot-security',
            },
        ]
    },
    {
        name:'Blockchain',
        slug:'blockchain',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Cryptocurrency",
                slug:'cryptocurrency',
            },
            {
                name:"Smart Contracts",
                slug:'smart-contracts',
            },
            {
                name:"Decentralized Applications",
                slug:'decentralized-applications',
            },
            {
                name:"NFTs",
                slug:'nfts',
            },
        ]
    },
    {
        name:'Artificial Intelligence',
        slug:'artificial-intelligence',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Natural Language Processing",
                slug:'natural-language-processing',
            },
            {
                name:"Computer Vision",
                slug:'computer-vision',
            },
            {
                name:"Robotics",
                slug:'robotics',
            },
            {
                name:"Deep Learning",
                slug:'deep-learning',
            },
        ]
    },
    {
        name:'Game Development',
        slug:'game-development',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Unity",
                slug:'unity',
            },
            {
                name:"Unreal Engine",
                slug:'unreal-engine',
            },
            {
                name:"Game Design",
                slug:'game-design',
            },
            {
                name:"Game Art",
                slug:'game-art',
            },
        ]
    },
    {
        name:'Mobile Development',
        slug:'mobile-development',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Android",
                slug:'android',
            },
            {
                name:"iOS",
                slug:'ios',
            },
            {
                name:"React Native",
                slug:'react-native',
            },
            {
                name:"Flutter",
                slug:'flutter',
            },
        ]
    },
 
    {
        name:'Data Science',
        slug:'data-science',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Machine Learning",
                slug:'machine-learning',
            },
            {
                name:"Deep Learning",
                slug:'deep-learning',
            },
            {
                name:"Data Analysis",
                slug:'data-analysis',
            },
            {
                name:"Data Visualization",
                slug:'data-visualization',
            },
        ]
    },
    {
        name:'Cloud Computing',
        slug:'cloud-computing',
        color:'#FF33FF',
        subcategories:[
            {
                name:"AWS",
                slug:'aws',
            },
            {
                name:"Azure",
                slug:'azure',
            },
            {
                name:"Google Cloud",
                slug:'google-cloud',
            },
        ]
    },
    {
        name:"3d Printing",
        slug:'3d-printing',
        color:'#FF5733',
        subcategories:[
            {
                name:"3D Modeling",
                slug:'3d-modeling',
            },
            {
                name:"3D Printing Materials",
                slug:'3d-printing-materials',
            },
            {
                name:"3D Printing Techniques",
                slug:'3d-printing-techniques',
            },
        ]
    },
    {
        name:"Films",
        slug:'films',
        color:'#FF5733',
        subcategories:[
            {
                name:"Film Production",
                slug:'film-production',
            },
            {
                name:"Film Editing",
                slug:'film-editing',
            },
            {
                name:"Film Direction",
                slug:'film-direction',
            },
        ]

    },
    {
        name:"Drawing and Painting",
        slug:'drawing-and-painting',
        color:'#FF5733',
        subcategories:[
            {
                name:"Digital Art",
                slug:'digital-art',
            },
            {
                name:"Traditional Art",
                slug:'traditional-art',
            },
            {
                name:"Art Techniques",
                slug:'art-techniques',
            },
        ]
    },
    {
        name:'Self-Improvement',
        slug:'self-improvement',
        color:'#FF33FF',
        subcategories:[
            {
                name:"Personal Development",
                slug:'personal-development',
            },
            {
                name:"Mindfulness",
                slug:'mindfulness',
            },
            {
                name:"Productivity",
                slug:'productivity',
            },
            {
                name:"Mental Health",
                slug:'mental-health',
            },
        ]
    }
]
const seed = async () => {
    const payload = getPayload({ config });
  
    for (const category of categories) {
      const existingParent = await (await payload).find({
        collection: 'categories',
        where: {
          slug: {
            equals: category.slug,
          },
        },
      });
  
      let parentCategory;
  
      if (existingParent.docs.length === 0) {
        parentCategory = await (await payload).create({
          collection: 'categories',
          data: {
            name: category.name,
            slug: category.slug,
            color: category.color,
            parent: null,
          },
        });
      } else {
        parentCategory = existingParent.docs[0];
      }
  
      for (const subcategory of category.subcategories || []) {
        const existingSub = await (await payload).find({
          collection: 'categories',
          where: {
            slug: {
              equals: subcategory.slug,
            },
          },
        });
  
        if (existingSub.docs.length === 0) {
          await (await payload).create({
            collection: 'categories',
            data: {
              name: subcategory.name,
              slug: subcategory.slug,
              parent: parentCategory.id,
            },
          });
        }
      }
    }
  };
  try{

      await seed()
      process.exit(0)
  }
    catch(e){
        console.log(e)
        process.exit(1)
    }