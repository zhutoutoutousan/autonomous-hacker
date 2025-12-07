# Social Media Red Team - OSINT Intelligence Gathering

## ⚠️ Legal and Ethical Disclaimer

**IMPORTANT**: This tool is designed for legitimate security research, red team exercises, and defensive intelligence gathering only. 

- **DO NOT** use this tool to harass, stalk, or harm individuals
- **DO NOT** use this tool for illegal activities
- **DO NOT** violate platform Terms of Service
- Always comply with local laws and regulations regarding data collection
- Respect privacy and use information responsibly
- This tool is for educational and authorized security research purposes only

**Users are solely responsible for ensuring their use of this tool complies with all applicable laws and regulations.**

## Overview

This tool performs OSINT (Open Source Intelligence) gathering on social media platforms to analyze potential threats, trolls, and malicious actors. It provides intelligence reports and defensive strategies rather than offensive actions.

## Features

- Multi-platform OSINT gathering (Bilibili, Twitter/X, Reddit, etc.)
- Profile analysis and cross-platform correlation
- Threat assessment and risk scoring
- Defensive strategy recommendations
- Automated intelligence reports

## Supported Platforms

- Bilibili (哔哩哔哩)
- Twitter/X
- Reddit
- Instagram (basic)
- LinkedIn (basic)
- TikTok (basic)

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID
```

### Advanced Usage

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID --deep-scan --export-json
```

## Configuration

Edit `config/config.yaml` to customize:
- API keys (if needed)
- Rate limiting
- Output formats
- Platform-specific settings

## Output

The tool generates:
- Intelligence reports (JSON/HTML)
- Profile analysis
- Cross-platform correlations
- Defensive strategy recommendations
- Timeline of activities

## License

This tool is provided for educational and authorized security research purposes only.

