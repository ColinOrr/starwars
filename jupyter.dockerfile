FROM jupyter/minimal-notebook
USER root

# Install curl
RUN apt-get update \
  && apt-get install -yq curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install the bash kernel
RUN pip install bash_kernel \
  && python -m bash_kernel.install

# Remove the default folder
RUN rm -rf /home/jovyan/work

USER $NB_UID
