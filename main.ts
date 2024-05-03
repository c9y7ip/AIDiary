import { Plugin, Editor, PluginSettingTab, App,Setting,Notice  } from "obsidian";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import systemPrompt from "prompt";
import * as dotenv from 'dotenv';



interface DiarySetting {
	OpenAIKey: string;
}

const DEFAULT_SETTINGS: Partial<DiarySetting> = {
	OpenAIKey: "",
};

export class DiarySettingTab extends PluginSettingTab {
	plugin: OpenAIDiaryPlugin;
  
	constructor(app: App, plugin: OpenAIDiaryPlugin) {
	  super(app, plugin);
	  this.plugin = plugin;
	}
  
	display(): void {
	  let { containerEl } = this;
  
	  containerEl.empty();
  
	  new Setting(containerEl)
		.setName("OpenAI Key")
		.setDesc("User OpenAI Key")
		.addText((text) =>
		  text
			.setPlaceholder("<openai-key>")
			.setValue(this.plugin.settings.OpenAIKey)
			.onChange(async (value) => {
			  console.log(value)
			  this.plugin.settings.OpenAIKey = value
			  await this.plugin.saveSettings();
			})
		);
	}
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        OPEN_AI_KEY: string;
      }
    }
  }
  
export default class OpenAIDiaryPlugin extends Plugin {
	settings: DiarySetting;


    async onload() {

		await this.loadSettings();
		this.addSettingTab(new DiarySettingTab(this.app, this));
		dotenv.config();
		

        const llm = new OpenAI({
            model: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPEN_AI_KEY,
            temperature: 1.0 
        });
		
		this.addRibbonIcon("dice", "Print to console", async () => {
				const activeEditor = this.app.workspace.activeEditor

				const prompt = PromptTemplate.fromTemplate(systemPrompt);
				
				const formattedPrompt = await prompt.format({
					text: activeEditor?.editor?.getValue(),
				});

				new Notice('[AI] I am reading ...');
				await llm.invoke(formattedPrompt).then(res=>{
					console.log(res)
					activeEditor?.editor.replaceRange(
						res,
						activeEditor?.editor.getCursor()
					);
					new Notice('[AI] Finish !');
				});
		  });

		  
        this.addCommand({
            id: "Load OpenAI Diary",
            name: "Load OpenAI Diary",
            editorCallback: async (editor: Editor) => {
                const user_input = editor.getValue()

                    const prompt = PromptTemplate.fromTemplate(systemPrompt);
                
                    const formattedPrompt = await prompt.format({
                        text: user_input,
                    });
					new Notice('[AI] I am reading ...');
                    await llm.invoke(formattedPrompt).then(res=>{
                        console.log(res)
                        editor.replaceRange(
                            res,
                            editor.getCursor()
                        );
						new Notice('[AI] Finish !');
                    });
            }
        });

    }

    async onunload() {
        // Your cleanup code here, if any
    }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	  }
	
	async saveSettings() {
	await this.saveData(this.settings);
	}
}



