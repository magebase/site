## [1.0.2](https://github.com/magebase/site/compare/v1.0.1...v1.0.2) (2025-09-07)


### Bug Fixes

* remove deploy.yml ([db537f1](https://github.com/magebase/site/commit/db537f14c5613259411aca8f994a330f42b507ce))

## [1.0.1](https://github.com/magebase/site/compare/v1.0.0...v1.0.1) (2025-09-07)


### Bug Fixes

* correct container registry image path ([69f4802](https://github.com/magebase/site/commit/69f4802a4002bd8032fc21a506594b9b7bb2df7d))
* correct container registry name to magebase/site ([0d8df29](https://github.com/magebase/site/commit/0d8df2963aa14c3865cfec2da62c60f221666ce2))

# 1.0.0 (2025-09-07)


### Bug Fixes

* add bootstrap ([4c1fec0](https://github.com/magebase/site/commit/4c1fec0413eee74df73e6a434babfefc4cc5b9bc))
* add bootstrap step ([feb1bee](https://github.com/magebase/site/commit/feb1bee796cdeb3e879510256bf83b87917655cc))
* add bundle ([461022b](https://github.com/magebase/site/commit/461022b43b835f9320d7dc409b2cb44d77341203))
* add Docker authentication to security scan job ([89fbb59](https://github.com/magebase/site/commit/89fbb595df457249c70b08d6ff21eb8d6da5cfd6))
* add github pat secrets ([0a45301](https://github.com/magebase/site/commit/0a453016a3fc28a324c26a48ae727eb19f2decce))
* add image availability check to security scan ([afd515c](https://github.com/magebase/site/commit/afd515cbab2c1f5759586d50643459c892d50caa))
* add management var ([06f6b50](https://github.com/magebase/site/commit/06f6b501c56ea9c48890f8405f3e57f583ae92d9))
* Add missing Cloudflare API token to base infrastructure workflow ([a1f76de](https://github.com/magebase/site/commit/a1f76deeda34214cf5e3b6334459c0f1f90d97c0))
* add missing SSH variables to Terraform commands ([4d6bbe4](https://github.com/magebase/site/commit/4d6bbe4891dcc93df6efa79a362e79f465446958))
* add necessary permissions for semantic-release ([56574ac](https://github.com/magebase/site/commit/56574acab07b9132755dab4d9339b79c7b896a60))
* add packages: write permission for GHCR deployment ([17048f7](https://github.com/magebase/site/commit/17048f7685f4316ca64d73298f659ad17c7ded19))
* add passthrough on traefik argocd ingress ([9ea665d](https://github.com/magebase/site/commit/9ea665d8b2c5c578c671354f226e4cd3e97015c7))
* add sso ([360153c](https://github.com/magebase/site/commit/360153c1d5742bd9e09c0a4197b5b73af3570a83))
* add sso ([96c4d88](https://github.com/magebase/site/commit/96c4d88a60c30fc4ff48aa0d98b6318903b3e706))
* Add state cleanup step and fix account IDs ([e78b20c](https://github.com/magebase/site/commit/e78b20c3a1536cf3694e60d56ddc19ee3cde6653))
* add terraform validate to pre-commit and resolve duplicate resources ([7b472c9](https://github.com/magebase/site/commit/7b472c976a25875ed53a8877a679e8ac1e16af70))
* align pre-commit and CI linting configurations ([3a4a448](https://github.com/magebase/site/commit/3a4a4489b23caf9d01a97e96eed0ccdd19161868))
* always run apply base-infrastructure ([d5cdc98](https://github.com/magebase/site/commit/d5cdc98ca05495dfa42c840a7a4a6671b37237a3))
* annontate ([1b01e6c](https://github.com/magebase/site/commit/1b01e6c4e2af18a0dd203816fd4e3dfd3740a0cc))
* bundle audit CI command and add missing dependencies ([af0af4f](https://github.com/magebase/site/commit/af0af4f2a7cb4cb2b18e2e1c68839a505043253a))
* cd into ([65efd1f](https://github.com/magebase/site/commit/65efd1fd0503458b22b1db4cdba42110db6b8475))
* cd into ([749257f](https://github.com/magebase/site/commit/749257f729792b74600e6e34815c44637d2e40f5))
* cd into ([9a20692](https://github.com/magebase/site/commit/9a206920a8a3a3323a48e45b8485cb1bce8786b4))
* cd into ([6679bc1](https://github.com/magebase/site/commit/6679bc1004153f4f17a9235c5ea71ee6aa2095da))
* cd into ([9061e00](https://github.com/magebase/site/commit/9061e001aeb6cb92538f3f35fc8a84cb88876337))
* combine pipelines ([50d1eb6](https://github.com/magebase/site/commit/50d1eb6dfffc0ce034f970110b67c366a98c6f75))
* commeted files ([2767660](https://github.com/magebase/site/commit/27676609dfd2d164a9656306e1be3c722770b07b))
* Correct ARGOCD_ADMIN_PASSWORD variable name in kustomization template ([15e194e](https://github.com/magebase/site/commit/15e194e90ebe19dd51e38dbd848a07b553ff8c2d))
* correct bundle audit and brakeman commands in CI workflow ([7cfd431](https://github.com/magebase/site/commit/7cfd43112e207e543270dc249b1efee0db88c3ef))
* correct set_published_at callback to avoid circular dependency ([809b120](https://github.com/magebase/site/commit/809b12019ce0832c4d72549fabfc2c207951a1b9))
* destroy ([3d4eba0](https://github.com/magebase/site/commit/3d4eba0bf20a52b0d8323e3b404beb43c5bacdac))
* disable automatic issue creation in semantic-release ([34a916e](https://github.com/magebase/site/commit/34a916ed033b6676ca52f697d9b813d09432310e))
* ensure bin/rails is executable in Docker build ([d603bcd](https://github.com/magebase/site/commit/d603bcdbad8dbdcb79a6f3aad5a8b3ac6c296625))
* healthcheck ([9baec6a](https://github.com/magebase/site/commit/9baec6aa835598ebc4ca5c97d04b5041c9c72f33))
* main ([eddcbae](https://github.com/magebase/site/commit/eddcbaeeae88c4a89b4c26f6becb3f4af4f2a874))
* main ([01018b1](https://github.com/magebase/site/commit/01018b1f72817339542ef680d4d1f3021ce147fc))
* main ([182a445](https://github.com/magebase/site/commit/182a44512c0c6d87ec0d417cb9dba9d00ea5acc1))
* main ([b591ccc](https://github.com/magebase/site/commit/b591ccc02aef1388ba31835deca6cb419d64329f))
* main ([978b166](https://github.com/magebase/site/commit/978b166c93f1587cdbf739d2d70557d5bcd09700))
* main ([537c6cb](https://github.com/magebase/site/commit/537c6cb2e0bbeb717d92b78ee885d57ae511ac50))
* main ([d505b07](https://github.com/magebase/site/commit/d505b07247b62eb92993a985ec261f9fd0419e5f))
* main? ([cafc32d](https://github.com/magebase/site/commit/cafc32da607f4c3a539cf17bfcfffa8d66db7853))
* make SARIF upload robust against Advanced Security requirements ([8b89764](https://github.com/magebase/site/commit/8b89764bc6a40546dc10300d2f2e058d5fc50d88))
* move tests after ([ffd362a](https://github.com/magebase/site/commit/ffd362a60568ead9ec756c72d6ccc5831fa2d8d4))
* pin kured version ([02ad277](https://github.com/magebase/site/commit/02ad277cbbf0fdcefe697f3ad636cf71e1a864b8))
* pipeline ([0c8b77b](https://github.com/magebase/site/commit/0c8b77b8b9ce2c7fb87de19e37cb98a105ec4232))
* pipeline ([96241a9](https://github.com/magebase/site/commit/96241a9c771eba377151cb7176b9767ee6b87681))
* pipeline ([017f377](https://github.com/magebase/site/commit/017f377387588d79f77ec606c406712ec4d5b09a))
* properly exclude Kubernetes YAML files from check-yaml hook ([c2ef78b](https://github.com/magebase/site/commit/c2ef78b3fa7eabafed5aef4197f3c198599e0e01))
* rails deploy ([a3854ed](https://github.com/magebase/site/commit/a3854ed6a3d90d07757530d3247d04cd32b2272e))
* rails deploy ([e859ee3](https://github.com/magebase/site/commit/e859ee3ab85281ff76a0cd01fbd6b60b2199703e))
* refactor barman r2 bucket to base-infrastructure ([7caa749](https://github.com/magebase/site/commit/7caa749597d3e5d8729e551e51a1fbe7ac009abb))
* refactor dirs ([2c2e77c](https://github.com/magebase/site/commit/2c2e77ca94b7ed716336f9bcd0ca38533587f22d))
* refactor workflows ([43e7237](https://github.com/magebase/site/commit/43e7237cdda10159d1a77bd1e49e32a14fbd86dd))
* refactor workflows ([056dbaa](https://github.com/magebase/site/commit/056dbaa5f83eb4b51f442605befc4f1446fa95e9))
* refactor workflows ([8ee1d89](https://github.com/magebase/site/commit/8ee1d89b6c22ac4b97421e13b8d707b12035d0ac))
* refactor workflows ([7df8db9](https://github.com/magebase/site/commit/7df8db915810c966ffa005f27272078c25ffcc46))
* remove ingress deployment ([084c999](https://github.com/magebase/site/commit/084c999e93914b78cba7ce31b540744474ad873c))
* remove terraform_docs hook to prevent pre-commit failures ([d87dae4](https://github.com/magebase/site/commit/d87dae407ab031519eacfcfaafb30f9777330540))
* replace ${DOMAIN} placeholder with valid hostname in ingress ([6befc64](https://github.com/magebase/site/commit/6befc64b5abe2997bbe985fe2e3b5897c87a2e9d))
* resolve all RuboCop and Prettier offenses ([4184731](https://github.com/magebase/site/commit/4184731e42595b19e9f42cbd7e5759542399f484))
* resolve base-infrastructure-deploy job skipping issue ([4a5a0ed](https://github.com/magebase/site/commit/4a5a0ed3d887baf62fef38b72c02f439b292f497))
* resolve container security scan and attestation issues ([8de390a](https://github.com/magebase/site/commit/8de390addfb22fdeb664963dfe612d5b40b4f0c5))
* Resolve cross-account access issues in org-sso ([edfc9f9](https://github.com/magebase/site/commit/edfc9f9f147d3df3ec0172196b537d7ac50c9014))
* resolve Hetzner resource availability and stale plan issues ([ceb4958](https://github.com/magebase/site/commit/ceb49580d92fedc8668e558cdd8bbf104a68d6ac))
* resolve npm ci lock file conflict by using npm install ([aa716f1](https://github.com/magebase/site/commit/aa716f1ea43edae8803997a3df3985256d8000ca))
* resolve sed command error in deployment step ([f923ac9](https://github.com/magebase/site/commit/f923ac9c0664568e8c343876b954726e0b7d77dd))
* resolve semantic-release owner/repo undefined variables ([61cceb2](https://github.com/magebase/site/commit/61cceb26afb08b6a2e9acbadcf4f38ccf99b0369))
* resolve Terraform environment variable and kustomization errors ([befd049](https://github.com/magebase/site/commit/befd04991e523b8a12a63f8189ee84c1f4d65df8))
* resolve Terraform errors for GitHub Actions deployment ([21ea296](https://github.com/magebase/site/commit/21ea296344e4386694a56c2f859ec7b9fe58149b))
* resolve test failures and infrastructure improvements ([c17b2a1](https://github.com/magebase/site/commit/c17b2a192b2fb7794e4befc16ebabcc4a1f78a33))
* restore Docker authentication for security scan ([1281b2e](https://github.com/magebase/site/commit/1281b2e8b33e321e8b9d76f6e6acedcc9ff5a2e4))
* restore S3 backend and fix account ID handling in CI/CD workflow ([a5c6783](https://github.com/magebase/site/commit/a5c67839da5db120c950f05cacbbcca464790a96))
* several landing pages main ([c3edbe3](https://github.com/magebase/site/commit/c3edbe3fed131981758efdff55ee07e4011994c6))
* site-infrastructure ([d5e5901](https://github.com/magebase/site/commit/d5e5901778375953d1b31a153be0ed9452d96b57))
* split ([8ad86bf](https://github.com/magebase/site/commit/8ad86bf7ef05e7fa508813d3c8981cfbd1a805b2))
* ssh keys ([7eceb8a](https://github.com/magebase/site/commit/7eceb8a8b8c1be33d5d4b422ca3cf0b21f97e2c5))
* ssh keys ([b269e07](https://github.com/magebase/site/commit/b269e071afc53331583eddae9cf13e3fb3b34db4))
* ssh keys ([2f7d210](https://github.com/magebase/site/commit/2f7d2105a65d9ad772b30a0357d4cf6d46962142))
* sso pipeline ([8946086](https://github.com/magebase/site/commit/89460860da13d19d01cc50f5dd88709634bb302c))
* terratests ([860961a](https://github.com/magebase/site/commit/860961ac030b88ac083cfcbb8b39482f57b18043))
* tf ([c28c08e](https://github.com/magebase/site/commit/c28c08ec31c28e9e2cafd4b950a91b4ef8050d67))
* update aws_ses_account_id references to use environment_account_id ([b2323b1](https://github.com/magebase/site/commit/b2323b1618dfed4e2eb72b328889185d469b47f4))
* update kustomize overlays to use resources instead of deprecated bases; remove non-existent redis patch ([066a570](https://github.com/magebase/site/commit/066a5701b292e482cf2492816df3ab38254e0bb4))
* update rails deployment ([8d38774](https://github.com/magebase/site/commit/8d3877411043dcf01632bd0af4043426414b914a))
* update security headers tests and restore comprehensive CSP ([a49b67f](https://github.com/magebase/site/commit/a49b67fde147c26d0bb065d2594972f27fbd7506))
* use bundle exec rails instead of bin/rails for assets precompile ([85685d8](https://github.com/magebase/site/commit/85685d80df6e9ac0189cfe39adc9f6498e49b3b2))
* use development account ID from organization module for SES ([a28cdf2](https://github.com/magebase/site/commit/a28cdf211e8f668c1dddbdecac4f1aa801a49236))
* use npm instead of yarn ([7516ef6](https://github.com/magebase/site/commit/7516ef666b71f20961e1046df360352ce0ed7ec8))
* version ([cee436f](https://github.com/magebase/site/commit/cee436f63b78065b74c9e37649be56c90bc3a5a7))


### Features

* add AASM state machine to QuoteRequest model ([ecaa32a](https://github.com/magebase/site/commit/ecaa32a3767d726140a19d0a821cc14843f10a3d))
* add ability to skip test job in Rails deployment workflow ([db5d2a3](https://github.com/magebase/site/commit/db5d2a39fea9f03c82b0606df94b6cad653d4cd1))
* add AnnotateRb pre-commit hook and gem ([5296b77](https://github.com/magebase/site/commit/5296b770b02b43fb98fa2034e9b1014c43077640))
* add ArgoCD Application manifests for magebase app ([52ff196](https://github.com/magebase/site/commit/52ff19693715583e6eb38878e122cb736c9d7bd1))
* add concurrency control to all GitHub Actions workflows ([6e47d1b](https://github.com/magebase/site/commit/6e47d1bd264903ccafa7670a3a2d8e79da174d69))
* add daily blog generation scheduling with SolidQueue ([6b08791](https://github.com/magebase/site/commit/6b08791102de8fd0f2346a2b2fa6657ffcba734a))
* add generate_post functionality to blog controller with tests ([5921d9c](https://github.com/magebase/site/commit/5921d9cf794e2f30e26bc47126f789bd75564614))
* add generic images to apple cards carousel for all 6 service categories ([048eb8d](https://github.com/magebase/site/commit/048eb8d00babc206a78788ac4f09b71898253de4))
* add GitHub secrets support for HCLOUD_TOKEN and CLOUDFLARE_API_TOKEN ([d3d2e61](https://github.com/magebase/site/commit/d3d2e6188f6697359bf5b03ee212e31864e6110d))
* Add GitHubActionsSSORole to org-sso and complete bootstrap setup ([faacf55](https://github.com/magebase/site/commit/faacf55d9b305c57c7927d02fa9a3e156bf8c1ca))
* add several quote features, landing page ([bd0dcdc](https://github.com/magebase/site/commit/bd0dcdcd3d094bd8aa2a5f12124af8ecb13d7148))
* Add template processing to workflow for Cloudflare R2 integration ([c3669cd](https://github.com/magebase/site/commit/c3669cddbb7e42897965482c99b513d9d145710b))
* add test for API key detection in BlogContentGeneratorService ([36c19cd](https://github.com/magebase/site/commit/36c19cdd8c944c9495ce7162f8783cefa41750ae))
* add ubicloud runner ([b8e8e88](https://github.com/magebase/site/commit/b8e8e88011da79d92eb18b53c9a20140c9437ebb))
* complete blog generation for all 35 use case categories ([9f50848](https://github.com/magebase/site/commit/9f5084806c82fbf3c841b7968cc4e569ad7eecad))
* configure RailsAdmin CMS for BlogPost management ([64756af](https://github.com/magebase/site/commit/64756af2775f8dd09c521a016ea15e02d2695705))
* download and use local high-resolution images for apple cards carousel ([f6284f5](https://github.com/magebase/site/commit/f6284f53375e8fa3ed1f814f0126f8fcd1443ff7))
* enable semantic release and automated GitHub releases ([5982637](https://github.com/magebase/site/commit/5982637d8634701a6ebfa33a2227c4467907e8f8))
* enhance semantic-release configuration for proper versioning ([8820544](https://github.com/magebase/site/commit/88205440a015a0e91d81311621b0840df30cba40))
* Ensure site-infrastructure only runs when unified-infrastructure succeeds for same commit ([3ea0120](https://github.com/magebase/site/commit/3ea01202975302ac437f7c7adecb721c2e967572))
* fix Ruby syntax errors in BlogContentGeneratorService regex patterns ([0729339](https://github.com/magebase/site/commit/07293391c54e38ecc65a57f3df84b0f68d324819))
* implement BlogContentGeneratorService with RubyLLM integration and fallback handling ([7284695](https://github.com/magebase/site/commit/728469558d1b10f764e430c04aa6f04052577a44))
* implement MarketingPageTemplate component to pass test ([4fdd6f2](https://github.com/magebase/site/commit/4fdd6f225eccc2a15eb16365bba96c734d339c7f))
* Implement PostgreSQL TLS encryption and comprehensive k3s encryption verification ([c10a9a1](https://github.com/magebase/site/commit/c10a9a13677af6a519a6dc4a69bfdc9c4aaaf376))
* implement RubyLLM timeline calculation and remove velocity field ([0c1c81f](https://github.com/magebase/site/commit/0c1c81f75142cd7d02848e6849b7ba1f83c74234))
* implement secure headers with comprehensive security configuration ([e52da4f](https://github.com/magebase/site/commit/e52da4fd3d6dcd002f75ce4bd1108084eb1e6a56))
* implement SSL termination at load balancer for ArgoCD ([0633dcf](https://github.com/magebase/site/commit/0633dcfbfd48df22cd3978e44249b96e2486a6af))
* integrate BlogContentGeneratorService with blog controller and add generate_post endpoint ([38a518a](https://github.com/magebase/site/commit/38a518a37f0bb6cbbea3019e614527e6777b393a))
* migrate to cycjimmy/semantic-release-action ([dc75442](https://github.com/magebase/site/commit/dc754427375a50b101a46da386fb847e61677fb1))
* remove phone input from career application form ([14a7a1e](https://github.com/magebase/site/commit/14a7a1e2559d396c885e7e65089ac86e98b23486))
* remove template-related files and footer links ([fe00068](https://github.com/magebase/site/commit/fe000686752f5a5338d79797aa96a648b565461a))
* remove templates route and controller actions ([e81e0cd](https://github.com/magebase/site/commit/e81e0cd38c7e364f6640d08229c3a80e6ef5131f))
* set domain for dev (dev.magebase.dev) and prod (magebase.dev) overlays ([dcd4fd8](https://github.com/magebase/site/commit/dcd4fd81c615dee1cff6adafa680ce398ae7b77b))
* update all workflows to use self-hosted runners ([a8c766c](https://github.com/magebase/site/commit/a8c766ccd8de77220f4bf65631a3115e4c2d0291))


### Performance Improvements

* optimize Docker build performance ([104cd1a](https://github.com/magebase/site/commit/104cd1ae760ba7164fad7a79e0cff615f78d3fdc))

## [1.1.4](https://github.com/magebase/site/compare/v1.1.3...v1.1.4) (2025-09-03)


### Bug Fixes

* resolve sed command error in deployment step ([56cc7f5](https://github.com/magebase/site/commit/56cc7f59c2f0951edca9f3342971847432ee3bec))

## [1.1.3](https://github.com/magebase/site/compare/v1.1.2...v1.1.3) (2025-09-03)


### Bug Fixes

* make SARIF upload robust against Advanced Security requirements ([897891e](https://github.com/magebase/site/commit/897891eaf0086702f754b0cdc7aa4e96ce5300c7))

## [1.1.2](https://github.com/magebase/site/compare/v1.1.1...v1.1.2) (2025-09-03)


### Bug Fixes

* add image availability check to security scan ([b937c08](https://github.com/magebase/site/commit/b937c08b835cbce6363af43702839b3cad499757))

## [1.1.1](https://github.com/magebase/site/compare/v1.1.0...v1.1.1) (2025-09-03)


### Bug Fixes

* restore Docker authentication for security scan ([a8a0031](https://github.com/magebase/site/commit/a8a00315a47eaf0fdc66c155dc81dedd3562850c))

# [1.1.0](https://github.com/magebase/site/compare/v1.0.7...v1.1.0) (2025-09-03)


### Bug Fixes

* add bundle ([8729292](https://github.com/magebase/site/commit/8729292643e7f1c0b770d8eaaed45c9697063175))
* annontate ([b248bfa](https://github.com/magebase/site/commit/b248bfad33e443ef70f1406ced0056222b868cd0))


### Features

* add AnnotateRb pre-commit hook and gem ([3e68eb5](https://github.com/magebase/site/commit/3e68eb5a23c0fb3b4a351a8ec99ba650234979fd))

## [1.0.7](https://github.com/magebase/site/compare/v1.0.6...v1.0.7) (2025-09-03)


### Bug Fixes

* add Docker authentication to security scan job ([2943cbe](https://github.com/magebase/site/commit/2943cbed07b1008e0529d7de2fda2db16d1a012d))

## [1.0.6](https://github.com/magebase/site/compare/v1.0.5...v1.0.6) (2025-09-03)


### Bug Fixes

* resolve container security scan and attestation issues ([8229cab](https://github.com/magebase/site/commit/8229cab3b68bdf52869f9223ecac7eaea11aed24))

## [1.0.5](https://github.com/magebase/site/compare/v1.0.4...v1.0.5) (2025-09-03)


### Bug Fixes

* use bundle exec rails instead of bin/rails for assets precompile ([2cea199](https://github.com/magebase/site/commit/2cea199fd0f1cd40b49ca447aad6f54d3f4f32d2))

## [1.0.4](https://github.com/magebase/site/compare/v1.0.3...v1.0.4) (2025-09-03)


### Bug Fixes

* ensure bin/rails is executable in Docker build ([6ae462c](https://github.com/magebase/site/commit/6ae462c1f8781116ad900516fe5896082b37493f))

## [1.0.3](https://github.com/magebase/site/compare/v1.0.2...v1.0.3) (2025-09-03)


### Performance Improvements

* optimize Docker build performance ([94c9ee7](https://github.com/magebase/site/commit/94c9ee7bdeac9c1b8daed35ad27143bae3a80cd4))

## [1.0.2](https://github.com/magebase/site/compare/v1.0.1...v1.0.2) (2025-09-03)


### Bug Fixes

* add packages: write permission for GHCR deployment ([f921391](https://github.com/magebase/site/commit/f921391f45d4f2860bd1f10a3d09fc1cf50025f0))

## [1.0.1](https://github.com/magebase/site/compare/v1.0.0...v1.0.1) (2025-09-03)


### Bug Fixes

* resolve semantic-release owner/repo undefined variables ([e77e379](https://github.com/magebase/site/commit/e77e379a017526e2616c9662293ed638af7b9ee1))

# 1.0.0 (2025-09-03)


### Bug Fixes

* add bootstrap ([323ea34](https://github.com/magebase/site/commit/323ea34cea7d21ee173b85e224b95c8c98fe1eb2))
* add bootstrap step ([104873a](https://github.com/magebase/site/commit/104873a35a51434c1fcb1b9ac3e9abba8122c056))
* add data sources to check for existing SES DNS records before creation ([9cb800a](https://github.com/magebase/site/commit/9cb800aa4182a37558e7a5be133945f86d3c3892))
* add environment-specific .tfvars files to git ([114d785](https://github.com/magebase/site/commit/114d785a06cc12d717976f5269f68f4e9e258447))
* add management var ([8f603a7](https://github.com/magebase/site/commit/8f603a786f6074659407dfffec1ad3b7bd55f7d6))
* add management var ([9d04955](https://github.com/magebase/site/commit/9d0495511d0302e36961a150cc11cd98b3dd53f8))
* add missing SSH variables to Terraform commands ([98cabd0](https://github.com/magebase/site/commit/98cabd09478e395e0f32e1b99e770ecf96b31468))
* add necessary permissions for semantic-release ([ecbb986](https://github.com/magebase/site/commit/ecbb986fb741f49caa0c4c9c87f063992bee4287))
* Add provider configs to clean up orphaned IAM resources ([3e7bc33](https://github.com/magebase/site/commit/3e7bc3399c03c5aec683ccd07cfd5b95972708d0))
* add sso ([2c6f5fb](https://github.com/magebase/site/commit/2c6f5fbc78e58de2705716c49a210d5554da6367))
* add sso ([1d474e1](https://github.com/magebase/site/commit/1d474e1e4a00f5acbd82d4283db8ba285a9f3202))
* add sso ([46257eb](https://github.com/magebase/site/commit/46257eb7fc2876e9698a3295c20654efeb62ee9b))
* add sso ([42cee8a](https://github.com/magebase/site/commit/42cee8a0127c04b080825faa1f6f4c8369c28cc0))
* Add state cleanup step and fix account IDs ([09cb7e6](https://github.com/magebase/site/commit/09cb7e6fba5173dd84338a641e4dd41b054a460d))
* add terraform validate to pre-commit and resolve duplicate resources ([1336b43](https://github.com/magebase/site/commit/1336b43550b5e4fe2a4c03fa012b6052315e88c8))
* align pre-commit and CI linting configurations ([1c8663b](https://github.com/magebase/site/commit/1c8663b4caa73966773d8806f9667b9eed6dfb17))
* allow assume ([01e732b](https://github.com/magebase/site/commit/01e732b80928d01395b336424d12383a81d40674))
* base infrastructure ([6b01331](https://github.com/magebase/site/commit/6b01331d68fc8abc333d9c5a93834f04024f643c))
* boostrap ([6138cd3](https://github.com/magebase/site/commit/6138cd376920ed047dc0eac9b964aa406a16b5a4))
* bundle audit CI command and add missing dependencies ([95d5503](https://github.com/magebase/site/commit/95d550362796d1055e87ce85389e116e0db53ac5))
* cd into ([79642c9](https://github.com/magebase/site/commit/79642c940b1725f0b002ade619a1b76ef49993ca))
* cd into ([c4c8e57](https://github.com/magebase/site/commit/c4c8e574cfba3539e4f78b52d456b602d8d5d974))
* cd into ([e4f6383](https://github.com/magebase/site/commit/e4f6383993fb06fdfe76c94035c141ecd3f71545))
* cd into ([b13cd2a](https://github.com/magebase/site/commit/b13cd2afe58dc91a7876f041533c628a77246ad1))
* cd into ([061561f](https://github.com/magebase/site/commit/061561f613169f28c9cd7beeee21d1d2eb74e2e7))
* cd into ([382b23e](https://github.com/magebase/site/commit/382b23e8c17ddbf26073aeab493b7a3eb152e1a2))
* change cf provider to version 5 ([e59750f](https://github.com/magebase/site/commit/e59750fd5cc384b1da575dc4a49eb10df944e9ff))
* combine pipelines ([c6f7f5e](https://github.com/magebase/site/commit/c6f7f5eeceffffdb8e6a89c5dd9dc33658cf5c84))
* correct ArgoCD variable templating for Kustomize ([9547e24](https://github.com/magebase/site/commit/9547e24c60b84ac59d76d952d4c2287fcc644246))
* correct bundle audit and brakeman commands in CI workflow ([4ddd721](https://github.com/magebase/site/commit/4ddd721a1ab13054ad4d4bc6b50023b6db3c5f16))
* correct Cloudflare data source syntax and references ([ea50f31](https://github.com/magebase/site/commit/ea50f312b87722c444fa52be3ca8ff4872c447fb))
* correct set_published_at callback to avoid circular dependency ([809b120](https://github.com/magebase/site/commit/809b12019ce0832c4d72549fabfc2c207951a1b9))
* Create cleanup roles with IAM permissions for orphaned resources ([2345542](https://github.com/magebase/site/commit/2345542edb184ddcf4d92f48e11c52a7eaea4e76))
* create SESManagerRole with proper trust policy for GitHubActionsSSORole ([fefb45d](https://github.com/magebase/site/commit/fefb45dfd861ea52441c088cb0c7db4f44861480))
* deploy k3s ([e363541](https://github.com/magebase/site/commit/e3635413b889854290d408b2f0254cdd39833b58))
* deployment ([9c6c38b](https://github.com/magebase/site/commit/9c6c38b23f97bf7ec5ab7da73e85e66af0f60812))
* deployment ([3aaaebc](https://github.com/magebase/site/commit/3aaaebc568b2916de82709ab03692ffc1b4304c4))
* deployment ([233be19](https://github.com/magebase/site/commit/233be197188d8818b05c33499cc4cd59c48d6d3e))
* disable automatic issue creation in semantic-release ([205e7b0](https://github.com/magebase/site/commit/205e7b0277bba212c8cd96a459a05b79e86a7b38))
* downgrade kube-hetzner to v2.15.4 for Terraform 1.8.0 compatibility ([e4cef2f](https://github.com/magebase/site/commit/e4cef2f0c3d6b90166c9e4b0dc65af35c2d4f9c0))
* downgrade kube-hetzner to v2.17.0 to resolve validation bug ([743aebe](https://github.com/magebase/site/commit/743aebede3bb1c42ee9f3ad19fb633709daa2949))
* email ([04511e3](https://github.com/magebase/site/commit/04511e3475192df5757f845560b43a471c6a3d9e))
* ensure ArgoCD Application is created in default namespace ([a15c2c2](https://github.com/magebase/site/commit/a15c2c21073db21d8c7181352d35f6a505aec900))
* format terraform files to resolve CI formatting check ([edfc3ba](https://github.com/magebase/site/commit/edfc3bac52c3c9d1eaabe360474be8707a1c26f4))
* format Terraform files to resolve CI/CD formatting check failures ([5587b83](https://github.com/magebase/site/commit/5587b83df0cb22aa0f7bce95067de1f67afddabe))
* format Terraform files with terraform fmt ([99ceb00](https://github.com/magebase/site/commit/99ceb00fb78a1f57ea7cd68d3104aaf4dbdcd16b))
* infra ([933fff4](https://github.com/magebase/site/commit/933fff498d234224f0ca9fdc0b4a29f85cadc956))
* main ([fdf52d4](https://github.com/magebase/site/commit/fdf52d4b8a1a02a10bb1d66f55e76fa6ab0dc6ef))
* main ([5470d0c](https://github.com/magebase/site/commit/5470d0c94b71b1a0199648edd6f228909dda6235))
* main ([4e528c5](https://github.com/magebase/site/commit/4e528c53a6e8ff588d9a0e8d6649aeece10f935c))
* main ([7d26f7c](https://github.com/magebase/site/commit/7d26f7c44d2d4d869337f6eb9a8b37e3928d9f30))
* main ([4de7fe7](https://github.com/magebase/site/commit/4de7fe77a4c4c0644ffe21ce1c5ea669020c1ee0))
* main ([abb3730](https://github.com/magebase/site/commit/abb373027c4af0a7e3f7b3b545b1c6cc1dc34585))
* main ([9194153](https://github.com/magebase/site/commit/91941537cf9acf32a95f40ceed615673eaf7d39e))
* main ([db11e8e](https://github.com/magebase/site/commit/db11e8e64d9dcad882bde048c5099c42a1cf86d2))
* main ([8a92db4](https://github.com/magebase/site/commit/8a92db4c903301d8f839ba73d7ff8b67981bc3dd))
* main? ([cd0bec8](https://github.com/magebase/site/commit/cd0bec84dd43d046c5c194da38b4b4b710aadc00))
* move tests after ([fc80660](https://github.com/magebase/site/commit/fc806604916a934e636edf6c8ed294e0a6b7bd8b))
* new version tf ([9d41f66](https://github.com/magebase/site/commit/9d41f66fcca537ba8616f2d1b9e7da09c35bb5bd))
* pin kured version ([d48a62d](https://github.com/magebase/site/commit/d48a62d58356601b0d5b10218090d3001343624a))
* pipeline ([2a780f0](https://github.com/magebase/site/commit/2a780f00ed145d6c0a099a25b2f16c49506fda07))
* pipeline ([a73c529](https://github.com/magebase/site/commit/a73c5299c4ddbf4b60170f9fbd15c1421274aafd))
* pipeline ([dbef131](https://github.com/magebase/site/commit/dbef1315d40087cb6d6b347829bb85570004157f))
* pipeline ([6772950](https://github.com/magebase/site/commit/6772950e4564ca19822c478d574d1a554dab5daa))
* pipeline ([c8b5075](https://github.com/magebase/site/commit/c8b507542d45925ec14d267fc3d78f44b67ca259))
* prevent kustomization hanging on load balancer ([7df514f](https://github.com/magebase/site/commit/7df514fa956fb2f5ceb5aef3ac3843f31b69ddea))
* properly exclude Kubernetes YAML files from check-yaml hook ([b3cf327](https://github.com/magebase/site/commit/b3cf327774a248a66b1dc672db73cab9cc4a55c8))
* rails deploy ([a02f91d](https://github.com/magebase/site/commit/a02f91d3604f68c9615ddcc3844b42f900edd35b))
* rails deploy ([7c3f777](https://github.com/magebase/site/commit/7c3f7771018259971b42aaef0cc91a7e77a1a031))
* refactor dirs ([27e4a84](https://github.com/magebase/site/commit/27e4a844c236aba2fe686f16e08cacda5e2f85ac))
* refactor workflows ([277d95b](https://github.com/magebase/site/commit/277d95b78104b54699a7fac3698ac9dcec34f12a))
* refactor workflows ([009f3b2](https://github.com/magebase/site/commit/009f3b20e44f335dc8b7a63562fabece102d94be))
* refactor workflows ([72a6bbc](https://github.com/magebase/site/commit/72a6bbca9102e315a6e9fc5580af35776fe74a25))
* refactor workflows ([6246328](https://github.com/magebase/site/commit/624632853105497bd85af12394814a25b4763f59))
* remove ArgoCD installation from extra-manifests ([6de382f](https://github.com/magebase/site/commit/6de382f048dfe38f609d9b664639bd500b96a672))
* remove ARGOCD_ADMIN_PASSWORD reference from kustomization ([b1f9e38](https://github.com/magebase/site/commit/b1f9e383059b7eb4faa3962f05a7b43fd4fb95da))
* remove global namespace from kustomization.yaml.tpl ([e1474d5](https://github.com/magebase/site/commit/e1474d533c05184bd6e2d62842f7c0e870b5397b))
* remove terraform_docs hook to prevent pre-commit failures ([0dc0b74](https://github.com/magebase/site/commit/0dc0b742709209b14bb008d21a4238f22039c801))
* resolve all RuboCop and Prettier offenses ([57b9bd4](https://github.com/magebase/site/commit/57b9bd4f85b820f314ed68f8747ebe5af52f2f58))
* resolve base-infrastructure-deploy job skipping issue ([1acd05f](https://github.com/magebase/site/commit/1acd05fc688e1756717f4395c948422618341aff))
* Resolve cross-account access issues in org-sso ([ba0b21a](https://github.com/magebase/site/commit/ba0b21ab656be0a6717cf21c5c066ccb94acf514))
* resolve Hetzner resource availability and stale plan issues ([de057c1](https://github.com/magebase/site/commit/de057c15f0d842e5ac00933a8c7cc645c1164a14))
* resolve kube-hetzner v2.18.1 compatibility issues ([2c662b9](https://github.com/magebase/site/commit/2c662b9f7233adc99daa26e6a4de49372ea970ad))
* resolve nat_router variable validation error in kube-hetzner v2.18.0 ([f6eae65](https://github.com/magebase/site/commit/f6eae65759bae73d910c38f8b3e26db75530acbe))
* resolve npm ci lock file conflict by using npm install ([8138a03](https://github.com/magebase/site/commit/8138a03d7b52eba4e91a34beda88563721cd1a3b))
* resolve remaining Terraform validation errors ([b923a78](https://github.com/magebase/site/commit/b923a78a41a070816166c3abd3988b7b234bcb0e))
* resolve Terraform environment variable and kustomization errors ([98cac7f](https://github.com/magebase/site/commit/98cac7f048ef1f5d919541600a6993c428be976b))
* resolve Terraform errors for GitHub Actions deployment ([68c0673](https://github.com/magebase/site/commit/68c067301591d938a0ed5e6a7d3cd04557a4e91a))
* resolve test failures and infrastructure improvements ([dd5cd8d](https://github.com/magebase/site/commit/dd5cd8dd58a1e7b8ffd5371f4220425cba866d67))
* resolve timeout command error by downgrading kube-hetzner and disabling upgrades ([c837872](https://github.com/magebase/site/commit/c8378723acf6e34fd355cb5397894d4952cee6ce))
* resolve timeout command not found error in kube-hetzner ([28477a6](https://github.com/magebase/site/commit/28477a60cf76f7e53b87816a7777efc616ff9993))
* restore S3 backend and fix account ID handling in CI/CD workflow ([2cd192e](https://github.com/magebase/site/commit/2cd192e6c966e99e2e7f4596e215a7e44466c19a))
* revert ([4182121](https://github.com/magebase/site/commit/4182121be7178d27bb106b235914b3b1c24bdf7b))
* revert to Singapore location with CPX11 servers ([60346ef](https://github.com/magebase/site/commit/60346efa259cfe90903cb4450e08bdf7692e9ecc))
* several landing pages main ([c3edbe3](https://github.com/magebase/site/commit/c3edbe3fed131981758efdff55ee07e4011994c6))
* Simplify orphaned resources cleanup approach ([1528aaa](https://github.com/magebase/site/commit/1528aaa10bcd8348562d86fd000ae5dc9053d37e))
* site-infrastructure ([6a846f6](https://github.com/magebase/site/commit/6a846f63c2fc24bc81990d9c16704d62fe026163))
* ssh keys ([6159916](https://github.com/magebase/site/commit/6159916b573591a4a18f14e77072a7c988b76387))
* ssh keys ([21cbb05](https://github.com/magebase/site/commit/21cbb0565e23da1a2dd7a7cfebd47af4741dba85))
* ssh keys ([f0f5b32](https://github.com/magebase/site/commit/f0f5b327ad48c74cbb9baeb558194bbf66250480))
* ssh keys ([5b818c8](https://github.com/magebase/site/commit/5b818c87ff8712fca5ef1a9b6ddbd847d428493a))
* sso pipelien ([df22e80](https://github.com/magebase/site/commit/df22e800256be8f2e7c2295b6ddb2fec17396968))
* sso pipeline ([9f424e0](https://github.com/magebase/site/commit/9f424e03ab82e03f4abf7191aa1472ac453e2d9a))
* sso pipeline ([e1e5d08](https://github.com/magebase/site/commit/e1e5d085b819514f68ae67d145ebfce0e55b9d1e))
* switch site-infrastructure from local to S3 backend ([58b6040](https://github.com/magebase/site/commit/58b60401055f8287751ed3c272724b636f71ae53))
* temporarily disable DynamoDB state locking to resolve lock conflicts ([f6c5ddb](https://github.com/magebase/site/commit/f6c5ddbe9ae78044cc2fafe63f5b03b813f05298))
* terrafor ([4831be2](https://github.com/magebase/site/commit/4831be26f4ef8540df9094e331de56dc612a6c7d))
* terraform ([e03f9fc](https://github.com/magebase/site/commit/e03f9fcab376d2c6a0be8b162adb36be64d8c6bc))
* terratests ([2c6b4af](https://github.com/magebase/site/commit/2c6b4afee70c63db22f30cff82263b1f24b38678))
* tf ([f83656f](https://github.com/magebase/site/commit/f83656f5249d0ddc6867bee0aa83e5a6cc10caf7))
* tf version ([cf92b56](https://github.com/magebase/site/commit/cf92b5613d2f0f5d9051dd3902d15b2153c5d738))
* update aws_ses_account_id references to use environment_account_id ([8954473](https://github.com/magebase/site/commit/8954473cab8df1f0ba4236f8bee78c80a30f3721))
* update kustomization.yaml.tpl to reference processed .yaml files ([f552e5b](https://github.com/magebase/site/commit/f552e5bf7cfb7500fd26b0f396f1e86df0e856d0))
* update rails deployment ([c45642a](https://github.com/magebase/site/commit/c45642aaa899b92e00da34574523bbadef882e00))
* use development account ID from organization module for SES ([b33f685](https://github.com/magebase/site/commit/b33f6854ed7d8988607e10831ba559adc2d22874))
* use domain_name variable for object storage endpoints and re-enable DynamoDB locking ([5739212](https://github.com/magebase/site/commit/5739212d1f6a7a03b1161208e80aa0cd3dd54ddb))
* use npm instead of yarn ([2cd9758](https://github.com/magebase/site/commit/2cd975855f94e02dce4c007929ab2a8d983a9741))
* validate ([5e35b33](https://github.com/magebase/site/commit/5e35b33bbbc3c8ab573b26574c242270664ba734))
* version ([2165f9f](https://github.com/magebase/site/commit/2165f9f23809d09112754abbf89c2e62a752c805))
* version ([c71fb0b](https://github.com/magebase/site/commit/c71fb0bc398e8c8b93b9122ba31a0ee12e2eaf4e))


### Features

* add AASM state machine to QuoteRequest model ([ecaa32a](https://github.com/magebase/site/commit/ecaa32a3767d726140a19d0a821cc14843f10a3d))
* add ability to skip test job in Rails deployment workflow ([9cf961f](https://github.com/magebase/site/commit/9cf961f1257fc6677e65b2a47eb97f7520215bef))
* add ArgoCD Application manifests for magebase app ([82ad27c](https://github.com/magebase/site/commit/82ad27ca6fb77b8afd56d8326c389be9f8cc283b))
* add daily blog generation scheduling with SolidQueue ([6b08791](https://github.com/magebase/site/commit/6b08791102de8fd0f2346a2b2fa6657ffcba734a))
* add generate_post functionality to blog controller with tests ([5921d9c](https://github.com/magebase/site/commit/5921d9cf794e2f30e26bc47126f789bd75564614))
* add generic images to apple cards carousel for all 6 service categories ([048eb8d](https://github.com/magebase/site/commit/048eb8d00babc206a78788ac4f09b71898253de4))
* add GitHub secrets support for HCLOUD_TOKEN and CLOUDFLARE_API_TOKEN ([7dd96ce](https://github.com/magebase/site/commit/7dd96ce1263fc89da3bee4f007be7a980fbcc412))
* Add GitHubActionsSSORole to org-sso and complete bootstrap setup ([2a18c88](https://github.com/magebase/site/commit/2a18c8827d2712a4c19b5ab737fb2d02dec90aa6))
* add several quote features, landing page ([bd0dcdc](https://github.com/magebase/site/commit/bd0dcdcd3d094bd8aa2a5f12124af8ecb13d7148))
* add test for API key detection in BlogContentGeneratorService ([36c19cd](https://github.com/magebase/site/commit/36c19cdd8c944c9495ce7162f8783cefa41750ae))
* add ubicloud runner ([808f107](https://github.com/magebase/site/commit/808f10776b0d37c74cb5c8c6b1c1d320dabc9139))
* complete blog generation for all 35 use case categories ([9f50848](https://github.com/magebase/site/commit/9f5084806c82fbf3c841b7968cc4e569ad7eecad))
* configure RailsAdmin CMS for BlogPost management ([64756af](https://github.com/magebase/site/commit/64756af2775f8dd09c521a016ea15e02d2695705))
* download and use local high-resolution images for apple cards carousel ([f6284f5](https://github.com/magebase/site/commit/f6284f53375e8fa3ed1f814f0126f8fcd1443ff7))
* enhance semantic-release configuration for proper versioning ([c1b7dbd](https://github.com/magebase/site/commit/c1b7dbdf3fa1fc74d5a5e1e1532de37280878a2b))
* Ensure site-infrastructure only runs when unified-infrastructure succeeds for same commit ([7659a75](https://github.com/magebase/site/commit/7659a758baa4497d2a270208a50b919befde897f))
* ensure SSO is enabled and all parameters passed in env-accounts ([897bd14](https://github.com/magebase/site/commit/897bd144bb209ef8e1e456d326dc88b5bd578f02))
* fix Ruby syntax errors in BlogContentGeneratorService regex patterns ([0729339](https://github.com/magebase/site/commit/07293391c54e38ecc65a57f3df84b0f68d324819))
* implement BlogContentGeneratorService with RubyLLM integration and fallback handling ([7284695](https://github.com/magebase/site/commit/728469558d1b10f764e430c04aa6f04052577a44))
* implement MarketingPageTemplate component to pass test ([4fdd6f2](https://github.com/magebase/site/commit/4fdd6f225eccc2a15eb16365bba96c734d339c7f))
* implement RubyLLM timeline calculation and remove velocity field ([0c1c81f](https://github.com/magebase/site/commit/0c1c81f75142cd7d02848e6849b7ba1f83c74234))
* integrate BlogContentGeneratorService with blog controller and add generate_post endpoint ([38a518a](https://github.com/magebase/site/commit/38a518a37f0bb6cbbea3019e614527e6777b393a))
* remove phone input from career application form ([14a7a1e](https://github.com/magebase/site/commit/14a7a1e2559d396c885e7e65089ac86e98b23486))
* remove template-related files and footer links ([fe00068](https://github.com/magebase/site/commit/fe000686752f5a5338d79797aa96a648b565461a))
* remove templates route and controller actions ([e81e0cd](https://github.com/magebase/site/commit/e81e0cd38c7e364f6640d08229c3a80e6ef5131f))
* update all workflows to use self-hosted runners ([9a2efb4](https://github.com/magebase/site/commit/9a2efb468884dba14d31bdd5dc6b8008ff66fce2))
* upgrade kube-hetzner to v2.18.1 as requested ([81cc0a6](https://github.com/magebase/site/commit/81cc0a6273624f7b60a86d507beb3fc90847b50f))
