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
