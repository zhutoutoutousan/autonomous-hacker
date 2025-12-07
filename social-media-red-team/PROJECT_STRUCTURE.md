# Project Structure

```
social-media-red-team/
│
├── main.py                 # Main entry point and orchestrator
├── requirements.txt        # Python dependencies
├── README.md              # Main documentation
├── USAGE.md               # Quick start guide
├── EXAMPLES.md            # Usage examples
├── LEGAL.md               # Legal and ethical guidelines
├── PROJECT_STRUCTURE.md   # This file
│
├── config/
│   └── config.yaml        # Configuration file
│
└── src/
    ├── __init__.py
    │
    ├── platforms/         # Platform-specific OSINT modules
    │   ├── __init__.py
    │   ├── bilibili.py    # Bilibili intelligence gathering
    │   ├── twitter.py     # Twitter/X intelligence gathering
    │   └── reddit.py      # Reddit intelligence gathering
    │
    ├── intelligence/      # Analysis and correlation modules
    │   ├── __init__.py
    │   ├── analyzer.py    # Threat analysis and correlation
    │   └── strategy.py    # Defensive strategy generation
    │
    └── reporting/         # Report generation modules
        ├── __init__.py
        └── reporter.py    # JSON/HTML/Text report generation
```

## Module Descriptions

### Main Entry Point
- **main.py**: Command-line interface and main orchestrator

### Platform Modules
- **bilibili.py**: Gathers profile info, statistics, videos, and performs analysis
- **twitter.py**: Twitter/X intelligence (requires API auth for full functionality)
- **reddit.py**: Reddit profile, posts, comments, and karma analysis

### Intelligence Modules
- **analyzer.py**: Correlates data across platforms, generates threat assessments
- **strategy.py**: Creates defensive strategies based on threat level

### Reporting Module
- **reporter.py**: Generates reports in JSON, HTML, and text formats

## Data Flow

1. **Input**: Platform + Account ID/Username
2. **Gathering**: Platform-specific OSINT collection
3. **Analysis**: Threat assessment and correlation
4. **Strategy**: Defensive recommendations
5. **Output**: Multi-format intelligence reports

## Extension Points

To add new platforms:
1. Create new module in `src/platforms/`
2. Implement `analyze_profile()` method
3. Add to platform initialization in `main.py`
4. Update configuration in `config/config.yaml`

