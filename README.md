# OpenAI Diary Plugin

This plugin integrates with OpenAI to provide AI-powered text generation capabilities within Obsidian. It allows you to leverage OpenAI's powerful language models to generate text based on prompts provided by the user.

## Installation

1. Make sure you have [Obsidian](https://obsidian.md/) installed.
2. Navigate to the Community Plugins tab in your Obsidian settings.
3. Search for "OpenAI Diary" and click "Install".
4. Once installed, enable the plugin in your settings.

## Usage

### Setting up OpenAI Key

1. After installing the plugin, go to Settings and navigate to the "OpenAI Diary" section.
2. Enter your OpenAI API key in the "OpenAI Key" field.
3. Click "Save" to apply the changes.

### Using the Plugin

#### Ribbon Icon

Click on the dice icon in the ribbon to invoke the OpenAI model on the text currently selected in the active editor. The generated text will replace the selected text.

#### Command

You can also use the command "Load OpenAI Diary" to generate text based on the content of the active editor. This command can be executed via the command palette or bound to a custom hotkey.

## Configuration

### OpenAI Key

You need to provide your OpenAI API key to use this plugin. This key is used to authenticate requests to the OpenAI API. Please make sure to keep your API key secure and do not share it publicly.

## Notes

-   This plugin uses the GPT-3.5 language model provided by OpenAI.
-   Text generation may take some time depending on the length and complexity of the input prompt.
-   Generated text will be displayed in the editor and logged to the console.

## Acknowledgements

This plugin utilizes the following libraries:

-   [obsidian](https://github.com/obsidianmd/obsidian)
-   [@langchain/openai](https://github.com/langchain/openai)
-   [@langchain/core](https://github.com/langchain/core)
-   [dotenv](https://github.com/motdotla/dotenv)

## Support

If you encounter any issues or have suggestions for improvement, please [open an issue](https://github.com/example/openai-diary-plugin/issues) on the GitHub repository.

## License

This plugin is licensed under the MIT License. See the [LICENSE](https://github.com/example/openai-diary-plugin/blob/main/LICENSE) file for details.

---

Feel free to customize and expand upon this README as needed!
